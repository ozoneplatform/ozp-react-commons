'use strict';

var React = require('react');
var Reflux = require('reflux');
var cx = React.addons.classSet;
var _ = require('../../utils/_.js');

var UserNotifications = require('./UserNotifications.jsx');

var SelfStore = require('../../stores/SelfStore.js');
var ProfileActions = require('../../actions/ProfileActions.js');

var UserNotificationDropdown = React.createClass({

    mixins: [
        Reflux.connect(SelfStore)
    ],

    // TODO: remove when reflux is upgraded to v0.2
    getInitialState() {
        return {
            notifications: null
        };
    },

    componentDidMount() {
        ProfileActions.fetchNotifications();
    },

    render() {
        var notifications = this.state.notifications;
        var hasNotifications = notifications && notifications.length > 0;
        var bellClassNames = cx({
            'icon-bell-filled': hasNotifications,
            'icon-bell': !hasNotifications,
            activeIcon: hasNotifications
        });

        return (
            <li className="dropdown" id="notification-dropdown">
                <a href="#" data-toggle="dropdown">
                    <i className={bellClassNames}></i>
                </a>
                {
                    hasNotifications &&
                        <UserNotifications notifications={notifications} />
                }
            </li>
        );
    }

});

module.exports = UserNotificationDropdown;
