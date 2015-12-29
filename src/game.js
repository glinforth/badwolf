/**
 * Created by glinforth on 02/03/14.
 */

var _ = require('underscore');
var util = require('util');
var events = require("events");
var characters = require('./characters/index');
var player_util = require('./player_util');
var fs = require('fs');

var Game = function (players, logfile) {
    var _players = players;
    var _uniqueCharacters = _.unique(
        _.pluck(players, 'characterType')
    ).map(function(typeName) {
            var character = characters[typeName]
            if (character)
            {
                return character;
            }
            throw new Error('Unknown character type: ' + typeName);
        });
    _uniqueCharacters = _.sortBy(_uniqueCharacters, function(c) {
            return c.getPriority();
        });

    _.each(_uniqueCharacters, function(c) {
        c.players = _.filter(players, function(p) {
            if (characters[p.characterType] === c) {
                p.isEvil = c.evil;
                return true;
            }
        });
    });

    var currentCharacterIndex = 0;
    var night_num = 0;
    var isNight = true;
    var toBeKilled = [];
    var toBeSaved = [];
    var dead = [];
    var me = this;

    function log(obj) {
        if (logfile) {
            fs.appendFile(logfile, JSON.stringify(obj) + '\n');
        } else {
            console.log(obj);
        }
    }

    this.start = function () {
        log(_.pluck(_players, 'characterType'));
        me.emit("started");
        switchToNight();
    };

    this.chooseTarget = function chooseTarget(index) {
        log(index);
        if (isNight) {
            var character = _uniqueCharacters[currentCharacterIndex];
            character.chooseTarget(me, character.players, _players[index]);
            nextCharacter();
        }
        else {
            if (_players[index] && !_players[index].isDead) {
                me.emit('dead', [index]);
                _players[index].isDead = true;
            }
            switchToNight();
        }
    };

    this.changeCharacter = function changeCharacter(player, newCharacterName) {
        var originalCharacter = characters[player.characterType];
        var newCharacter = characters[newCharacterName];
        originalCharacter.players = _.without(originalCharacter.players, player);
        newCharacter.players.push(player);
        player.characterType = newCharacterName;
        player.isEvil = newCharacter.evil;
    };

    var beforeNight = function () {
        _.each(_uniqueCharacters, function(character) {
            _.each(character.players, function(player) {
                player.isSafe = false;
                character.beforeNight(player);
            });
        });
    }

    var switchToNight = function() {
        currentCharacterIndex = -1;
        night_num++;
        isNight = true;
        checkIfWin();
        me.emit('night');
        beforeNight();
        nextCharacter();
    }

    var switchToDay = function() {
        isNight = false;
        isNight = false;
        me.emit('day');
        var toBeSaved = _.filter(_players, function(p) {
           return p.toBeSaved;
        });
        var toBeKilled = _.filter(_players, function(p) {
            return p.toBeKilled;
        });
        me.emit('alive', _.map(toBeSaved, function(p) {
            return _.indexOf(_players, p);
        }));
        me.emit('dead', _.map(toBeKilled, function(p) {
            return _.indexOf(_players, p);
        }));
        _.each(toBeSaved, function(p) {
            p.toBeSaved = false;
            p.isDead = false;
        });
        _.each(toBeKilled, function(p) {
            p.toBeKilled = false;
            p.isDead = true;
        });
        checkIfWin();
        var targets = player_util.getValidTargets(_players, function (p) {
            return !p.isDead;
        });
        targets.push(-1); //failed lynch
        me.emit('gettarget', 'LYNCH', targets);
    }

    function nextCharacter() {
        currentCharacterIndex++;
        if (currentCharacterIndex >= _uniqueCharacters.length) {
            switchToDay();
        }
        else {
            var character = _uniqueCharacters[currentCharacterIndex];
            if (character.doNight(me, night_num, _players, character.players))
            {
                nextCharacter();
            }
        }
    }

    function didEvilWin() {
        var firstCharTypeName = null;
        var currentPlayer = null;
        for (var i = 0; i < _players.length; i++) {
            currentPlayer = _players[i];
            if (!currentPlayer.isDead) {
                if (!currentPlayer.isEvil) {
                    return false;
                }
                if (firstCharTypeName == null) {
                    firstCharTypeName = currentPlayer.characterType;
                } else if (currentPlayer.characterType !== firstCharTypeName) {
                    return false;
                }
            }
        }
        if (firstCharTypeName) {
            return firstCharTypeName;
        }
        return "NO ONE";
    }

    function didGoodWin() {
        return _.every(_players, function(p) {
           return p.isDead || !p.isEvil;
        });
    }

    function checkIfWin () {
        if (didGoodWin()) {
            me.emit('goodwins');
            return;
        }
        var didEvilWinResult = didEvilWin();
        if (didEvilWinResult) {
            me.emit('evilwins', didEvilWinResult);
        }
    }
};

util.inherits(Game, events.EventEmitter);

module.exports = Game;