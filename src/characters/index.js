/**
 * Created by glinforth on 02/03/14.
 */
/*
require("fs").readdirSync(__dirname + "/").forEach(function(file) {
    if (file != 'index.js') {
        var item = require("./" + file);
        module.exports[item.getName()] = item;
    }
});*/

module.exports = {
    'AMY_AND_RORY': require('./amyandrory'),
    'ANGEL': require('./angel'),
    'CYBERMAN': require('./cyberman'),
    'DALEK': require('./dalek'),
    'DOCTOR': require('./doctor'),
    'JACK': require('./jack'),
    'K9': require('./k9'),
    'RIVER': require('./river'),
    'SILENCE': require('./silence'),
    'TARDIS': require('./tardis'),
    'SONTARAN': require('./sontaran'),
    'COMPANION': require('./companion')
}