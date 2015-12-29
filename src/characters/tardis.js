/**
 * Created by glinforth on 07/05/14.
 */

var util = require('../player_util');
var _ = require('underscore');

var NAME = 'TARDIS';

module.exports = {
    beforeNight: function(me) {
    },
    doNight: function(g, num, allPlayers, tardises) {
        if (num != 1) {
            g.emit('wake', NAME);
            var targets = util.getValidTargets(allPlayers, function (p) {
                return !tardises.hasSaved && _.any(tardises, function (a) {
                    return !a.isDead;
                }) && p.isDead;
            });
            targets.push(-1);
            g.emit('gettarget', NAME, targets);
            return false;
        }
        return true;
    },
    chooseTarget: function(g, players, targetPlayer) {
        if (!util.isDead(players)) {
            if (util.isSavable(targetPlayer) && !players.hasSaved) {
                players.hasSaved = true;
                targetPlayer.toBeSaved = true;
            }
        }
        return true;
    },
    getName: function() {
        return NAME;
    },
    getPriority: function() {
        return 3;
    }
};