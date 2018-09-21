'use strict';
//Is this used???
var React = require('react');
var Reflux = require('reflux');
var UserNotification = require('./UserNotification.jsx');
var ProfileActions = require('../../actions/ProfileActions.js');
var { CENTER_URL} = require('../../OzoneConfig');


var UserNotifications = React.createClass({

    _renderNotification(notification, openDropdown) {
        return <UserNotification
            updateHud={this.props.updateHud}
            key={notification.id}
            notification={notification}
            openDropdown={openDropdown}
            />;
    },

    _renderNotifications() {
        var notifications = this.props.notifications;
        var length = 5;
        var openDropdown = this.props.openDropdown;

        return notifications.slice(0, length).map((notification, index) => {
            var notificationComponent = this._renderNotification(notification, openDropdown);
            return index === length - 1 ?
                notificationComponent :
                [notificationComponent, <li className="divider"></li>];
        });
    },

    open: function(){
        if(window.location.href.indexOf(CENTER_URL) != -1)
            window.location.href = window.location.href + (window.location.href.indexOf('?') == -1 ? '?' : '&') + 'notifications=true';
        else
            this.props.moreNotifications();
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
                      <button className="btn btn-primary btn-sm" onClick={this.open}>See more</button>
                    </li>
                </ul>
            );
        }
        return null;
    }

});

module.exports = UserNotifications;
