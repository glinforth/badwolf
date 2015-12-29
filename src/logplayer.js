/**
 * Created by glinforth on 16/05/14.
 */

var fs = require('fs'),
    _ = require('underscore'),
    Game = require('./game'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('log.txt'),
    output: process.stdout,
    terminal: false
});

var game;

rd.on('line', function(line) {
    var v = JSON.parse(line);
    if (_.isArray(v)) {
        startGame(v);
    } else if (_.isNumber(v)) {
        game.chooseTarget(v);
    }
});

rd.on('close', function() {
    if (game) {
        console.log('Unfinished game');
    }
});

function startGame(chars) {
    var players = _.map(chars, function(c) {
        return { characterType: c };
    });
    if (game) {
        console.log('Unfinished game');
    }
    game = new Game(players);
    game.on('goodwins', function() {
        console.log('good wins');
        game = null;
    });
    game.on('evilwins', function(c) {
        console.log(c + ' wins');
        game = null;
    });
    game.start();
}