/**
 * Created by glinforth on 07/05/14.
 */

var util = require('../player_util');
var _ = require('underscore');

var NAME = 'K9';

module.exports = {
    beforeNight: function(me) {
    },
    doNight: function(g, num, allPlayers, k9s) {
        g.emit('wake', NAME);
        g.emit('gettarget', NAME, util.getValidTargets(allPlayers, function(p) {
            return _.any(k9s, function(a) { return !a.isDead; }) && !p.isDead && !_.contains(k9s, p);
        }));
        return false;
    },
    chooseTarget: function(g, players, targetPlayer) {
        if (!util.isDead(players)) {
            if (targetPlayer.isEvil && targetPlayer.characterType != 'SILENCE') {
                g.emit('foundevil');
                return true;
            }
        }
        g.emit('notfoundevil');
        return true;
    },
    getName: function() {
        return NAME;
    },
    getPriority: function() {
        return 4;
    }
};