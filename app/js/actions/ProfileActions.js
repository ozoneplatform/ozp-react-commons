'use strict';

var Reflux = require('reflux');
var createActions = require('../utils/createActions');
var ProfileApi = require('../api/Profile');
var _  = require('../utils/_');

var ProfileActions = createActions({
    fetchNotifications() {
        ProfileApi.fetchNotifications()
            .done(ProfileActions.fetchNotificationsCompleted)
            .fail(ProfileActions.fetchNotificationsFailed);
    },

    dismissNotification(notification) {
        ProfileApi.dismissNotification(notification.id)
            .done(function () {
                ProfileActions.dismissNotificationCompleted(notification);
            })
            .fail(function () {
                ProfileActions.dismissNotificationFailed(notification);
            });
    },

    acknowledgeAllNotifications(notificationList) {
        notificationList.forEach(ProfileActions.acknowledgeNotification);
    },

    acknowledgeNotification(notification) {
        if(notification.acknowledgedStatus === false) {
            ProfileApi.updateNotification({id: notification.id, acknowledgedStatus:true})
                .done(function () {
                    ProfileActions.acknowledgeNotificationCompleted(notification);
                })
                .fail(function () {
                    ProfileActions.acknowledgeNotificationFailed(notification);
                });
        }
    },

    readNotification(notification) {
        if(notification.readStatus === false){
            ProfileApi.updateNotification({id: notification.id, readStatus: true})
                .done(function () {
                    ProfileActions.readNotificationCompleted(notification);
                })
                .fail(function() {
                    ProfileActions.readNotificationFailed(notification);
                });
        }
    }
});

_.assign(ProfileActions, Reflux.createActions([
    'fetchProfile',
    'fetchSelf',
    'fetchLibrary',
    'fetchOwnedListings',
    'updateLaunchPreference'
]));

module.exports = ProfileActions;
