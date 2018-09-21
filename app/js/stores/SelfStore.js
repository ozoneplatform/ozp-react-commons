'use strict';

require('object-assign');

var Reflux = require('reflux');
var _ = require('../utils/_');
var ProfileActions = require('../actions/ProfileActions');
var ProfileApi = require('../api/Profile');
var { UserRole } = require('../constants');
var OzpError = require('../utils/OzpError');
var { ORG_STEWARD, APPS_MALL_STEWARD } = UserRole;

//functions to mix in to the currentUser object
var profileFunctions = {
    isAdmin: function() {
        return UserRole[this.highestRole] >= APPS_MALL_STEWARD;
    },
    isOwner: function(listing) {
        return listing.owners.some(u => u.username === this.username);
    },
    isOrgSteward: function(orgShortName) {
        return this.stewardedOrganizations.some(o => o === orgShortName);    },
    canEdit: function(listing) {
        return listing &&
            (this.isAdmin() || this.isOwner(listing) || this.isOrgSteward(listing.agencyShort));
    }
};

var SelfStore = Reflux.createStore({
    currentUser: null,
    currentUserError: false,
    notifications: null,

    listenables: ProfileActions,

    doTrigger: function() {
        this.trigger(this.getDefaultData());
    },

    handleProfileChange: function(promise) {
        var me = this,
            trigger = me.doTrigger.bind(me);

        promise.done(function(profile) {
            me.currentUserError = false;
            me.currentUser = Object.assign({}, profile, profileFunctions);
        }).done(trigger);
    },

    onFetchSelf: function () {
        this.handleProfileChange(ProfileApi.getProfile());
    },

    onUpdateLaunchPreference: function(launchInWebtop) {
        var me = this,
            profile = me.currentUser;

        this.handleProfileChange(ProfileApi.updateProfile(
            Object.assign({}, profile, {launchInWebtop: launchInWebtop})));
    },

    onUpdateProfileFlagsCompleted: function() {
        ProfileActions.fetchSelf();
        this.doTrigger();
    },

    getDefaultData: function () {
        return _.pick(this, 'currentUser', 'currentUserError', 'notifications');
    },

    onFetchNotificationsCompleted: function (notifications) {
        this.notifications = notifications.getResponse();
        this.doTrigger();
    },

    onDismissNotificationCompleted: function (notification) {
        _.remove(this.notifications, notification);
        this.doTrigger();
    },

    onAcknowledgeNotificationCompleted: function (notification) {
        _.find(this.notifications, {'id':notification.id}).acknowledgedStatus = true;
        this.doTrigger();
    },

    onReadNotificationCompleted: function (notification) {
        _.find(this.notifications, {'id':notification.id}).readStatus = true;
        this.doTrigger();
    }
});

module.exports = SelfStore;
