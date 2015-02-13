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
