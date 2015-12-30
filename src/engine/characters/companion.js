/**
 * Created by glinforth on 12/07/14.
 */

var util = require('../player_util');

var NAME = 'COMPANION';

module.exports = {
    beforeNight: function(me) {
    },
    doNight: function(g, num) {
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