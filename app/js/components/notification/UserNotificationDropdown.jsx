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

    openDropdown() {
        if($(this.getDOMNode()).find('.UserNotification').length > 1) {
            $(this.getDOMNode()).addClass('open');
        }
    },

    componentDidMount() {
        ProfileActions.fetchNotifications();
    },

    render() {
        var notifications = this.state.notifications;
        var hasNotifications = notifications && notifications.length > 0;
        var bellClassNames = cx({
            'icon-bell-filled-blue': hasNotifications,
            'icon-bell-grayLightest': !hasNotifications,
            activeIcon: hasNotifications
        });

        return (
            <li data-toggle="tooltip" data-placement="bottom" title="Notifications" className="dropdown tooltiped" id="notification-dropdown">
                <a href="#" data-toggle="dropdown">
                    <i className={bellClassNames}></i>
                </a>
                {
                    hasNotifications &&
                        <UserNotifications notifications={notifications} openDropdown={this.openDropdown} />
                }
            </li>
        );
    }

});

module.exports = UserNotificationDropdown;
