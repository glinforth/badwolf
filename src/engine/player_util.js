/**
 * Created by glinforth on 18/04/14.
 */

var _ = require('underscore');

function isProtected(player) {
    return player && !!player.isSafe;
}

function isAlive(player) {
    return player && !player.isDead;
}

function isKillable(player) {
    return player && !player.isDead && !player.toBeKilled && !isProtected(player);
}

function isSavable(player) {
    return player && player.isDead && !player.permaDead;
}

function isDead(players) {
    return _.every(players, function(p) {
        return p.isDead;
    });
}

function getValidTargets(players, fn) {
    var validTargets = [];
    _.each(players, function(p, i) {
        if (fn(p)) {
            validTargets.push(i);
        }
    });
    return validTargets;
}

exports.isProtected = isProtected;
exports.isAlive = isAlive;
exports.isKillable = isKillable;
exports.isSavable = isSavable;
exports.isDead = isDead;
exports.getValidTargets = getValidTargets;