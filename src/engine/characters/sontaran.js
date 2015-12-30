/**
 * Created by glinforth on 12/05/14.
 */

var util = require('../player_util');
var _ = require('underscore');

var NAME = 'SONTARAN';

module.exports = {
    beforeNight: function(me) {
    },
    doNight: function(g, num, allPlayers, sontarans) {
        g.emit('wake', NAME);
        g.emit('gettarget', NAME, util.getValidTargets(allPlayers, function(p) {
            return _.any(sontarans, function(a) { return !a.isDead; }) && !p.isDead && !_.contains(sontarans, p);
        }));
        return false;
    },
    chooseTarget: function(g, players, targetPlayer) {
        if (!util.isDead(players)) {
            if (util.isKillable(targetPlayer)) {
                targetPlayer.toBeKilled = true;
            }
        }
        return true;
    },
    getName: function() {
        return NAME;
    },
    getPriority: function() {
        return 9;
    },
    evil: true
};