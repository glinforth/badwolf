/**
 * Created by glinforth on 07/05/14.
 */

var util = require('../player_util');
var _ = require('underscore');

var NAME = 'ANGEL';

module.exports = {
    beforeNight: function(me) {
    },
    doNight: function(g, num, allPlayers, angels) {
        g.emit('wake', NAME);
        g.emit('gettarget', NAME, util.getValidTargets(allPlayers, function(p) {
            return _.any(angels, function(a) { return !a.isDead; }) && !p.isDead && !_.contains(angels, p);
        }));
        return false;
    },
    chooseTarget: function(g, players, targetPlayer) {
        if (!util.isDead(players)) {
            if (util.isKillable(targetPlayer)) {
                targetPlayer.toBeKilled = true;
                targetPlayer.permaDead = true;
            }
        }
        return true;
    },
    getName: function() {
        return NAME;
    },
    getPriority: function() {
        return 7;
    },
    evil: true
};