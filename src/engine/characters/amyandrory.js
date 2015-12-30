/**
 * Created by glinforth on 07/05/14.
 */

var util = require('../player_util');

var NAME = 'AMY_AND_RORY';

module.exports = {
    beforeNight: function(me) {
    },
    doNight: function(g, num) {
        if (num == 1) {
            g.emit('wake', NAME);
        }
        return true;
    },
    chooseTarget: function(g, players, targetPlayer) {
        return true;
    },
    getName: function() {
        return NAME;
    },
    getPriority: function() {
        return 5;
    }
};