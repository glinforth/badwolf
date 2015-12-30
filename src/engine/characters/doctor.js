/**
 * Created by glinforth on 02/03/14.
 */

var util = require('../player_util');
var _ = require('underscore');

module.exports = {
    beforeNight: function() {
    },
    doNight: function(g, num, allPlayers, doctors) {
        g.emit('wake', 'DOCTOR');
        g.emit('gettarget', 'DOCTOR', util.getValidTargets(allPlayers, function(p) {
                return _.any(doctors, function(a) { return !a.isDead; }) && !p.isDead && p !== doctors.previousTarget;
        }));
        return false;
    },
    chooseTarget:function(g, players, targetPlayer) {
        if (!util.isDead(players)) {
            if (players.previousTarget !== targetPlayer) {
                if (util.isKillable(targetPlayer)) {
                    targetPlayer.isSafe = true;
                }
                players.previousTarget = targetPlayer;
            }
            else {
                players.previousTarget = null;
            }
        }
        else {
            players.previousTarget = null;
        }
    },
    getName: function() {
        return 'DOCTOR';
    },
    getPriority: function() {
        return 1;
    }
};