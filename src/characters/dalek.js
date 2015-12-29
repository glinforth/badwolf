/**
 * Created by glinforth on 02/03/14.
 */

var util = require('../player_util');
var _ = require('underscore');

var NAME = 'DALEK';

module.exports = {
    beforeNight: function(me) {
        me.isSafe = true;
    },
    doNight: function(g, num, allPlayers, daleks) {
        g.emit('wake', NAME);
        g.emit('gettarget', NAME, util.getValidTargets(allPlayers, function(p) {
            return _.any(daleks, function(a) { return !a.isDead; }) && !p.isDead && !_.contains(daleks, p);
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
        return 6;
    },
    evil: true
};