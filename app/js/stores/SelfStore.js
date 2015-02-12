'use strict';

require('object-assign');

var Reflux = require('reflux');
var _ = require('../utils/_');
var ProfileActions = require('../actions/ProfileActions');
var ProfileApi = require('../api/Profile');
var { UserRole } = require('../constants');
var { ORG_STEWARD, ADMIN } = UserRole;

//functions to mix in to the currentUser object
var profileFunctions = {
    isAdmin: function() {
        return UserRole[this.highestRole] >= ADMIN;
    },
    isOwner: function(listing) {
       return listing.owners.some(u => u.username === this.username);
    },
    isOrgSteward: function(org) {
        return UserRole[this.highestRole] >= ORG_STEWARD &&
            this.stewardedOrganizations.some(o => o === org);
    },
    canEdit: function(listing) {
        return listing &&
            (this.isAdmin() || this.isOwner(listing) || this.isOrgSteward(listing.agency));
    }
};

var SelfStore = Reflux.createStore({
    currentUser: null,
    currentUserError: false,

    listenables: ProfileActions,

    doTrigger: function() {
        this.trigger(this.getDefaultData());
    },

    handleProfileChange: function(promise) {
        var me = this,
            trigger = me.doTrigger.bind(me);

        promise.then(function(profile) {
            me.currentUserError = false;
            me.currentUser = Object.assign({}, profile, profileFunctions);
        }, function() {
            me.currentUserError = true;
            me.currentUser = null;
        }).then(trigger, trigger);
    },

    onFetchSelf: function () {
        this.handleProfileChange(ProfileApi.getProfile('self'));
    },

    onUpdateLaunchPreference: function(launchInWebtop) {
        var me = this,
            profile = me.currentUser;

        this.handleProfileChange(ProfileApi.updateProfile(profile.id,
                Object.assign({}, profile, {launchInWebtop: launchInWebtop})));
    },

    getDefaultData: function () {
        return _.pick(this, 'currentUser', 'currentUserError');
    }
});

module.exports = SelfStore;
