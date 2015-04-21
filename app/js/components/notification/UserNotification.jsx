'use strict';

var React = require('react');
var { PropTypes } = React;
var _Date = require('../Date.jsx');
var Time = require('../Time.jsx');

var SelfActions = require('../../actions/ProfileActions.js');

var UserNotification = React.createClass({

    propTypes: {
        notification: PropTypes.object.isRequired
    },

    onDismiss(event) {
        this.props.openDropdown();
        event.preventDefault();
        event.stopPropagation();
        SelfActions.dismissNotification(this.props.notification);
    },

    render() {
        var { createdDate, message } = this.props.notification;
        createdDate = new Date(createdDate);
        return (
            <li className="UserNotification">
                <button type="button" className="close pull-right" onClick={this.onDismiss}><i className="icon-cross-16"></i></button>
                <h5 className="created-by">OZONE</h5>
                <div className="created-at">
                    <_Date date={createdDate} />
                    <Time date={createdDate} />
                </div>
                <p className="message small">{message}</p>
            </li>
        );
    }

});

module.exports = UserNotification;
