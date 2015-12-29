/**
 * Created by glinforth on 02/03/14.
 */

var Game = require('./game');
var _ = require('underscore');

var players = [
    {
        name: 'Two',
        characterType: 'RIVER'
    },
    {
        name: 'Three',
        characterType: 'DALEK'
    },
    {
        name: 'One',
        characterType: 'DOCTOR'
    },
    {
        name: 'Tardy',
        characterType: 'TARDIS'
    },
    {
        name: 'Rors',
        characterType: 'AMY_AND_RORY'
    },
    {
        name: 'Ams',
        characterType: 'AMY_AND_RORY'
    },
    {
        name: 'Jacky',
        characterType: 'JACK'
    },
    {
        name: 'Shh',
        characterType: 'SILENCE'
    },
    {
        name: 'Kay Nine',
        characterType: 'K9'
    }
];

var game = new Game(players);

game.on('started', function() {
   console.log('Game has started');
});

game.on('day', function(deaths, saves) {
   console.log('It is morning.  Everyone open yours eyes.');
});

game.on('dead', function(deaths) {
    _.each(deaths, function(d) {
        console.log(players[d].name + ' is dead.');
    });
});

game.on('night', function() {
    console.log('It is night.  Everyone close your eyes.');
});

game.on('wake', function (character) {
    console.log(character + ' please open your eyes.');
});

game.on('gettarget', function(character, targets) {
    console.log(character + ' please select a target.');
    _.each(targets, function(t) {
        console.log('t-' + t);
    });
});

game.on('goodwins', function() {
    console.log('Good wins!');
    process.exit(0);
});

game.on('evilwins', function(character) {
   console.log('Team ' + character + ' wins!');
   process.exit(0);
});

game.start();
game.chooseTarget(0);
game.chooseTarget(2);
game.chooseTarget(0);
game.chooseTarget(2);
game.chooseTarget(2);
game.chooseTarget(1);
game.chooseTarget(3);