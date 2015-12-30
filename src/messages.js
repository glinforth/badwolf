/**
 * Created by glinforth on 29/12/15.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Messages extends React.Component {
    componentWillUpdate() {
        var node = this.refs.div;
        let hScrollBarHeight = (node.scrollWidth != node.clientWidth) ? 20 : 0;
        this.shouldScrollBottom = ((node.scrollTop + node.clientHeight + hScrollBarHeight) >= node.scrollHeight);
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            var node = this.refs.div;
            node.scrollTop = node.scrollHeight
        }
    }

    render() {
        return (<div className="messages" ref="div">
            <ReactCSSTransitionGroup transitionName="messages-item" transitionEnterTimeout={1500} transitionLeaveTimeout={0}>
                {this.props.messages.map((msg, i) => <div key={'msg' + i}>{msg}</div>)}
            </ReactCSSTransitionGroup>
        </div>);
    }
}

export default Messages;