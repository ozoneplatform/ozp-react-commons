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

        var notificationButtonClasses = cx({
          'dropdown': true,
          'tooltiped': true,
          'disabled': !hasNotifications
        });

        var tooltip = (hasNotifications) ? (notifications.length > 1) ? `${notifications.length} new notifications` : `${notifications.length} new notification` : 'No new notifications';

        return (
            <li data-toggle="tooltip" data-placement="bottom" data-original-title={tooltip} className={notificationButtonClasses} id="notification-dropdown">
                <a href="#" data-toggle="dropdown" id="tourstop-notifications">
                    <i className={bellClassNames}></i>
                    <span className="hidden-span"> notifications, {(this.state.notifications) ? this.state.notifications.length : 0} unread notifications</span>
                </a>
                {
                    hasNotifications &&
                        <UserNotifications updateHud={this.props.updateHud} notifications={notifications} openDropdown={this.openDropdown} moreNotifications={this.props.moreNotifications}/>
                }
            </li>
        );
    }

});

module.exports = UserNotificationDropdown;
