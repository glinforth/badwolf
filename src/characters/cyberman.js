
var util = require('../player_util');
var _ = require('underscore');

var NAME = 'CYBERMAN';

module.exports = {
    beforeNight: function(me) {
    },
    doNight: function(g, num, allPlayers, cybermen) {
        if (num % 2 === 1) {
            g.emit('wake', NAME);
            g.emit('gettarget', NAME, util.getValidTargets(allPlayers, function(p) {
                return _.any(cybermen, function(a) { return !a.isDead; }) && !p.isDead && !_.contains(cybermen, p);
            }));
            return false;
        } else {
            if (_.any(cybermen, function(a) { return !a.isDead; }) && cybermen.previousTarget && !cybermen.previousTarget.toBeSaved && !cybermen.previousTarget.isEvil) {
                cybermen.previousTarget.toBeSaved = true;
                g.changeCharacter(cybermen.previousTarget, NAME);
                g.emit('turnedtocyberman', _.indexOf(allPlayers, cybermen.previousTarget));
            } else {
                g.emit('turnedtocyberman', null);
            }
            cybermen.previoustarget = null;
            return true;
        }
    },
    chooseTarget: function(g, players, targetPlayer) {
        if (!util.isDead(players)) {
            if (util.isKillable(targetPlayer)) {
                targetPlayer.toBeKilled = true;
                players.previousTarget = targetPlayer;
            }
        }
        return true;
    },
    getName: function() {
        return NAME;
    },
    getPriority: function() {
        return 90;
    },
    evil: true
};