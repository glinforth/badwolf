/**
 * Created by glinforth on 30/12/15.
 */
import React from 'react';
import characters from './characters';

export default function status(props) {
    return (<ul className="list-group player-status-list">
        {props.players.map((p, i) => (<li key={i} className={deadClass(p)}>
        {i+1}: {p.get('name')} {p.get('isDead', false) ? <i>(Dead)</i> : <span></span>}
        </li>))}
    </ul>);
};

function deadClass(player) {
    return "list-group-item " + (player.get('isDead', false) ? 'isDead' : '');
}