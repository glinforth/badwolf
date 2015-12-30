/**
 * Created by glinforth on 29/12/15.
 */

import Immutable from 'immutable';
import { ADD_PLAYER,REMOVE_PLAYER,START_GAME,UPDATE_PLAYER,ADD_MESSAGE,GET_TARGET,NEW_GAME,GOOD_WINS,EVIL_WINS,WAKE } from './actions';
import { getMsg, getWinMsg, getWakeMsg } from './characters';

const initialState = Immutable.Map({
    players: Immutable.List(),
    gameStarted: false,
    messages: Immutable.List(),
    targets: Immutable.Set(),
    activeTeam: null
});

function badwolf(state=initialState, action={})
{
    switch(action.type) {
        case ADD_PLAYER:
            return state.set('players', state.get('players').push(Immutable.Map({name:'',characterType:'COMPANION'})));
        case REMOVE_PLAYER:
            return state.set('players', state.get('players').delete(action.id));
        case UPDATE_PLAYER:
            let players = state.get('players');
            players = players.set(action.id, action.player);
            return state.set('players', players);
        case START_GAME:
            return state.set('gameStarted', true).set('messages', Immutable.List());
        case ADD_MESSAGE:
            return addMessage(state, action.msg);
        case GET_TARGET:
            let msg = action.team === 'LYNCH' ? 'Everyone vote for someone to kill.' : getMsg(action.team);
            state = addMessage(state, msg);
            let targets = Immutable.Set(action.targets);
            let activeTeam = action.team;
            return state.merge({targets, activeTeam});
        case WAKE:
            let wakeMsg = getWakeMsg(action.team);
            return addMessage(state, wakeMsg);
        case NEW_GAME:
            return state.merge({
                players: Immutable.List(state.get('players').map(p => {
                    return Immutable.Map({name: p.get('name'), characterType:'COMPANION'});
                })),
                gameStarted: false,
                messages: Immutable.List(),
                targets: Immutable.Set(),
                activeTeam: null
            });
        case EVIL_WINS:
            let winMsg = action.team === 'NOONE' ? 'Everyone is dead.  No one wins.' : getWinMsg(action.team);
            return addMessage(state, winMsg)
                .merge({activeTeam: null});
        case GOOD_WINS:
            return addMessage(state, 'Good wins.')
                .merge({activeTeam: null});
        default:
            return state;
    }
}

function addMessage(state, msg) {
    let messages = state.get('messages');
    messages = messages.push(msg);
    return state.set('messages', messages);
}

export default badwolf;