/**
 * Created by glinforth on 29/12/15.
 */

import Engine from './engine';
import {getMsg} from './characters';

export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const START_GAME = 'START_GAME';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const GET_TARGET = 'GET_TARGET';
export const NEW_GAME = 'NEW_GAME';
export const GOOD_WINS = 'GOOD_WINS';
export const EVIL_WINS = 'EVIL_WINS';
export const WAKE = 'WAKE';

export function addPlayer() {
    return { type: ADD_PLAYER };
}

export function removePlayer(id) {
    return { type: REMOVE_PLAYER, id };
}

export function updatePlayer(id, player) {
    return { type: UPDATE_PLAYER, id, player };
}

let currentGame = null;

export function startGame(players) {
    return (dispatch) => {
        dispatch({type: START_GAME});
        players = players.toJS();
        currentGame = new Engine(players);
        currentGame.on('started', () => dispatch(addMessage('Game has started')));
        currentGame.on('goodwins', () => dispatch(goodWins()));
        currentGame.on('evilwins', (team) => dispatch(evilWins(team)));
        currentGame.on('gettarget', (team, targets) => dispatch(getTarget(team, targets)));
        currentGame.on('dead', (ids) => dispatch(dead(ids)));
        currentGame.on('alive', (ids) => dispatch(alive(ids)));
        currentGame.on('day', () => dispatch(addMessage('It is day.')));
        currentGame.on('night', () => dispatch(addMessage('It is night.')));
        currentGame.on('wake', (team) => dispatch(wake(team)));
        currentGame.on('foundevil', (team) => dispatch(addMessage('Evil detected.')));
        currentGame.on('notfoundevil', (team) => dispatch(addMessage('No evil detected.')));
        currentGame.start();
    }
}

const LYNCH = 'LYNCH';

function getTarget(team, targets = []) {
    return {type: GET_TARGET, team, targets};
}

function dead(ids) {
    return (dispatch, getState) => {
        if (ids.length === 0) {
            return;
        }
        ids.forEach(id => dispatch(updatePlayer(id, getState().get('players').get(id).merge({isDead:true}))));
        let deadPlayerNames = ids.map(id => getState().get('players').get(id).get('name')).reduce((memo, v) => memo + ', ' + v);
        if (ids.length > 1) {
            dispatch(addMessage('The following players are dead: ' + deadPlayerNames));
        }
        else {
            dispatch(addMessage(deadPlayerNames + ' is dead.'));
        }
    }
}

function alive(ids) {
    return (dispatch, getState) => {
        if (ids.length === 0) {
            return;
        }
        ids.forEach(id => dispatch(updatePlayer(id, getState().get('players').get(id).merge({isDead:false}))));
        let alivePlayerNames = ids.map(id => getState().get('players').get(id).get('name')).reduce((memo, v) => memo + ', ' + v);
        if (ids.length > 1) {
            dispatch(addMessage('The following players are alive: ' + alivePlayerNames));
        }
        else {
            dispatch(addMessage(alivePlayerNames + ' is alive.'));
        }
    }
}

export function addMessage(msg) {
    return { type: ADD_MESSAGE, msg };
}

export function pickTarget(id) {
    return () => currentGame.chooseTarget(id);
}

export function newGame() {
    return { type: NEW_GAME };
}

export function goodWins() {
    return {type:GOOD_WINS};
}

export function evilWins(team) {
    return {type:EVIL_WINS, team};
}

function wake(team) {
    return {type:WAKE, team};
}