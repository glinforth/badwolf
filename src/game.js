/**
 * Created by glinforth on 29/12/15.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import GameSetup from './gamesetup';
import Messages from './messages';
import TargetSelect from './targetselect';
import Status from './playerstatus';
import { addPlayer, removePlayer, updatePlayer, startGame, pickTarget, newGame } from './actions';

function game(props) {
    return props.gameStarted ?
        (<div>
            <button type="button" className="btn btn-default" onClick={props.newGame}>New Game</button>
            <Messages
            messages={props.messages}
        /><TargetSelect activeTeam={props.activeTeam}
            targets={props.targets} players={props.players} pickTarget={props.pickTarget}/>
            <Status players={props.players}/>
        </div>) :
        (<GameSetup
        players={props.players}
        addPlayer={props.addPlayer}
        removePlayer={props.removePlayer}
        updatePlayer={props.updatePlayer}
        startGame={props.startGame}
    />);
}

function mapStateToProps(state) {
    return {
        players: state.get('players'),
        gameStarted: state.get('gameStarted'),
        messages: state.get('messages'),
        activeTeam: state.get('activeTeam'),
        targets: state.get('targets')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addPlayer: () => dispatch(addPlayer()),
        removePlayer: (id) => dispatch(removePlayer(id)),
        updatePlayer: (id, player) => dispatch(updatePlayer(id, player)),
        startGame: (players) => dispatch(startGame(players)),
        pickTarget: (id) => dispatch(pickTarget(id)),
        newGame: () => dispatch(newGame())
    };
}

game.propTypes = {
    players: PropTypes.object.isRequired,
    gameStarted: PropTypes.bool.isRequired,
    activeTeam: PropTypes.string,
    targets: PropTypes.object,
    addPlayer: PropTypes.func.isRequired,
    removePlayer: PropTypes.func.isRequired,
    updatePlayer: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    pickTarget: PropTypes.func.isRequired,
    newGame: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(game);