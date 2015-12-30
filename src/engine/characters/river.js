/**
 * Created by glinforth on 26/04/14.
 */

var util = require('../player_util');
var _ = require('underscore');

module.exports = {
    beforeNight: function() {

    },
    doNight: function(g, num, allPlayers, rivers) {
        g.emit('wake', 'RIVER');
        g.emit('gettarget', 'RIVER', util.getValidTargets(allPlayers, function(p) {
            return _.any(rivers, function(a) { return !a.isDead; }) && !p.isDead && !_.contains(rivers, p);
        }));
        return false;
    },
    chooseTarget:function(g, players, targetPlayer) {
        if (players.previousTarget) {
            players.previousTarget.toBeSaved = true;
            players.previousTarget = null;
        }
        if (!util.isDead(players) && util.isKillable(targetPlayer) && targetPlayer.characterType != 'SILENCE') {
            targetPlayer.toBeKilled = true;
            players.previousTarget = targetPlayer;
        }
    },
    getName: function() {
        return "RIVER";
    },
    getPriority: function() {
        return 2;
    }
};