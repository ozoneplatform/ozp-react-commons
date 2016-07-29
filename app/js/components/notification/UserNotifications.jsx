'use strict';

var React = require('react');
var Reflux = require('reflux');
var UserNotification = require('./UserNotification.jsx');

var UserNotifications = React.createClass({

    _renderNotification(notification, openDropdown) {
        return <UserNotification
            updateHud={this.props.updateHud}
            key={notification.id}
            notification={notification}
            openDropdown={openDropdown} />;
    },

    _renderNotifications() {
        var notifications = this.props.notifications;
        var length = 3;//notifications.length;
        var openDropdown = this.props.openDropdown;

        return notifications.slice(0, length).map((notification, index) => {
            var notificationComponent = this._renderNotification(notification, openDropdown);
            return index === length - 1 ?
                notificationComponent :
                [notificationComponent, <li className="divider"></li>];
        });
    },

    render() {
        var notifications = this.props.notifications;
        if (notifications && notifications.length > 0) {
            // HACK: this is a hotfix to fix for the next release, adding a new
            // issue to toggle the tooltip off when the dropdown is visible.
            return (
                <ul style={{'zIndex': '10000000'}} className="dropdown-menu UserNotifications">
                    { this._renderNotifications(this.props.func) }
                    <li>
                      <button className="btn btn-primary btn-sm" onClick={() => this.props.moreNotifications()}>See more</button>
                    </li>
                </ul>
            );
        }
        return null;
    }

});

module.exports = UserNotifications;
