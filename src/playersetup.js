/**
 * Created by glinforth on 29/12/15.
 */
import React from 'react';
import characters from './characters';

export default function setup(props) {
    return (
        <li className="list-group-item">
            <form className="form-inline">
                <div className="form-group">
                    <input className="form-control" type="text"
                           placeholder="Name"
                           onChange={(evt) => props.updatePlayer(props.player.set('name', evt.target.value))}
                           value={props.player.get('name')}/>
                    <select className="form-control"
                            onChange={(evt) => props.updatePlayer(props.player.set('characterType', evt.target.value))}
                            value={props.player.get('characterType')}>
                        {characters.map(((c, i) => <option key={"type" + i} value={c.id}>{c.name}</option>))}
                    </select>
                    <button type="button" title="Remove"
                            className="btn btn-danger btn-sm"
                            onClick={props.removePlayer}>X</button>
                </div>
            </form>
        </li>
    );
};