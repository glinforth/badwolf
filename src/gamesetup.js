/**
 * Created by glinforth on 29/12/15.
 */
import React from 'react';
import PlayerSetup from './playersetup';
import { addPlayer } from './actions';

export default function setup(props) {
    return (<div>
        <ul className="list-group">
            {props.players.map((player, i) => (<PlayerSetup
                key={'player' + i}
                player={player}
                removePlayer={props.removePlayer.bind(this, i)}
                updatePlayer={props.updatePlayer.bind(this, i)}
            />))
            }
        </ul>
        <button type="button" className="btn btn-default" onClick={props.addPlayer}>Add Player</button>
        <button type="button" className="btn btn-default" onClick={props.startGame.bind(this, props.players)}>Start game</button>
    </div>);
};