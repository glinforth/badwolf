/**
 * Created by glinforth on 12/05/14.
 */
var angular = require('angular');
var Game = require('./game');
var _ = require('underscore');
var app = angular.module('Badwolf', []);
var char_msgs = require('./character_messages')

app.controller('BadwolfController', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    var players = [];
    var game = null;
    var codes = [];
    var remainingCodes = [];
    var alarm = null;

    $scope.alarmLength = 180;
    $scope.selectedTarget = null;
    $scope.players = players;
    $scope.characters = [
        { id: 'COMPANION', name: 'Companion' },
        { id: 'AMY_AND_RORY', name: 'Amy and Rory' },
        { id: 'ANGEL', name: 'Weeping Angel' },
        { id: 'CYBERMAN', name: 'Cyberman' },
        { id: 'DOCTOR', name: 'The Doctor' },
        { id: 'RIVER', name: 'River Song' },
        { id: 'TARDIS', name: 'The Tardis' },
        { id: 'JACK', name: 'Captain Jack Harkness' },
        { id: 'DALEK', name: 'Dalek' },
        { id: 'K9', name: 'K9' },
        { id: 'SONTARAN', name: 'Sontaran' },
        { id: 'SILENCE', name: 'The Silence' }];

    initCodes();
    $scope.codes = codes;

    $scope.timeRemaining = function() {
        return alarm ? alarm - Date.now()  : null;
    };

    function checkTime() {
        if ($scope.useTimer) {
            if ($scope.timeRemaining() <= -3000) {
                alarm = null;
                $scope.chooseTarget();
            } else {
                $timeout(checkTime, 100);
            }
        }
        else {
            alarm = null;
        }
    }

    function getCharName(charId) {
        var char = _.find($scope.characters, function(character) {
            return character.id === charId;
        });
        if (char) {
            return char.name;
        }
        return charId;
    }

    function getPlayerName(playerIndex) {
        var player = players[playerIndex];
        if (player) {
            return player.name;
        }
        return "No one";
    }

    $scope.addPlayer = function () {
        players.push({ characterType: 'COMPANION' });
    };

    $scope.removePlayer = function (player) {
        var index = players.indexOf(player);
        if (index > -1) {
            players.splice(index, 1);
        }
    };

    $scope.start = function() {
        initCodes();
        $scope.messages = [];
        $scope.logs = [];
        _.each(players, function(p) {
            delete p.isDead;
            remainingCodes.splice(codes.indexOf(p.code), 1);
        });

        game = new Game(_.map(players, function(p) {
            return _.clone(p);
        }));

        game.on('started', function() {
            showMessage('Game has started');
        });

        game.on('day', function(deaths, saves) {
            showMessage('It is morning.  Everyone open your eyes.');
        });

        game.on('dead', function(deaths) {
            if (deaths && deaths.length > 0) {
                _.each(deaths, function (d) {
                    players[d].isDead = true;
                    showMessage((d + 1) + '-' + players[d].name + ' is dead.');
                });
            }
            else {
                showMessage('No deaths');
            }
        });

        game.on('alive', function(alives) {
            if (alives && alives.length > 0) {
                _.each(alives, function (a) {
                    players[a].isDead = false;
                    showMessage((a + 1) + '-' + players[a].name + ' is alive.');
                });
            }
            else {
                showMessage('No resurrections');
            }
        });

        game.on('night', function() {
            showMessage('It is night.  Everyone close your eyes.');
        });

        game.on('wake', function (character) {
            var msg = char_msgs['wake'][character] || getCharName(character) + ' please open your eyes.';
            showMessage(msg);
        });

        game.on('gettarget', function(character, targets) {
            var msg = char_msgs['gettarget'][character] || getCharName(character) + ' please select a target.';
            showMessage(msg);
            addLog(getCharName(character) + ' selects ');
            $scope.targets = [];
            if (targets && targets.length > 0) {
                _.each(targets, function(t) {
                    var player = players[t];
                    if (player) {
                        $scope.targets.push({ name: player.name, index: t});
                    } else {
                        $scope.targets.push({ name: 'No target', index: t});
                    }
                });
                if (character === 'LYNCH') {
                    if ($scope.useTimer) {
                        alarm = new Date((new Date()).getTime() + $scope.alarmLength * 1000);
                        $timeout(checkTime, 100);
                    }
                }
            } else {
                $scope.targets = [{ name: "No valid target", index: -1}];
            }
        });

        game.on('goodwins', function() {
            showMessage('Good wins!');
            game.removeAllListeners();
        });

        game.on('evilwins', function(character) {
            var msg = char_msgs['evilwins'][character] || 'Team ' + getCharName(character) + ' wins!';
            showMessage(msg);
            game.removeAllListeners();
        });

        game.on('foundevil', function() {
            showMessage('Evil detected!');
            playSound('affirmative.ogg', 'affirmative.mp3', null);
        });

        game.on('notfoundevil', function() {
            showMessage('No evil detected!');
        });

        game.on('turnedtocyberman', function(i) {
            var player = players[i];
            if (player) {
                showMessage(player.code + ' is a cyberman.');
            } else {
                showMessage(nonPlayerCode() + ' is a cyberman.');
            }
        });

        game.start();

        $scope.mode = "messages";
    };

    $scope.chooseTarget = function(selectedIndex) {
        addLog(selectedIndex + '-' + getPlayerName(selectedIndex));
        $scope.targets = null;
        showMessage('Now close your eyes.');
        game.chooseTarget(selectedIndex);
        $timeout(function() {
            $scope.selectedTarget = null;
        }, 500);
    };

    function showMessage(msg) {
        $scope.messages.push(msg);
        $timeout(function () {
            $('#messagebox').stop().animate({
                scrollTop: $("#messagebox")[0].scrollHeight
            }, 800);
        }, 500);
    }

    function addLog(msg) {
        $scope.logs.push(msg);
    }

    function playSound(soundfile_ogg, soundfile_mp, soundfile_ma) {
        if ("Audio" in window) {
            var a = new Audio();
            if (!!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"')
                .replace(/no/, '')))
                a.src = soundfile_ogg;
            else if (!!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/,
                '')))
                a.src = soundfile_mp;
            else if (!!(a.canPlayType && a.canPlayType(
                'audio/mp4; codecs="mp4a.40.2"').replace(/no/, '')))
                a.src = soundfile_ma;
            else
                a.src = soundfile_mp;

            a.autoplay = true;
            return;
        }
    }

    function initCodes() {
        while(codes.length > 0) {
            codes.pop();
        }
        while(remainingCodes.length > 0) {
            remainingCodes.pop();
        }
        var suits = ['♣','♦','♥','♠'];
        var values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        _.each(suits, function(suit) {
            _.each(values, function(value) {
                codes.push(value + suit);
                remainingCodes.push(value + suit);
            });
        });
    }

    function nonPlayerCode() {
        var min = 0;
        var max = remainingCodes.length;
        var index = Math.floor(Math.random() * (max - min + 1)) + min;
        return remainingCodes.splice(index, 1);
    }

}]);