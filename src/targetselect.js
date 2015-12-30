/**
 * Created by glinforth on 29/12/15.
 */
import React from 'react';
import characters from './characters';

export default function target(props) {
    if (props.activeTeam) {
        return (<div className="target-select">
            {props.targets.map((t, i) => <button key={'target' + i} type="button"
                                                 className="btn btn-default" onClick={props.pickTarget.bind(this, t)}>
                {t + 1}: {props.players.get(t).get('name')}
            </button>)}
            <button type="button" className="btn btn-default" onClick={props.pickTarget}>Do nothing</button>
        </div>);
    }
    else {
        return <div></div>;
    }
}