
var util = require('../player_util');
var _ = require('underscore');

var NAME = 'JACK';
var CHANCE_OF_RECOVERING = 0.3;

module.exports = {
    beforeNight: function(me) {
    },
    doNight: function(g, num, allPlayers, jacks) {
        _.each(jacks, function(j) {
            if (util.isSavable(j) && !j.toBeSaved) {
                var r = Math.random();
                j.toBeSaved = r < CHANCE_OF_RECOVERING;
            }
        });
        return true;
    },
    chooseTarget: function(g, players, targetPlayer) {
        return true;
    },
    getName: function() {
        return NAME;
    },
    getPriority: function() {
        return 100;
    }
};