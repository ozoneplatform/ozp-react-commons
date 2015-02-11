'use strict';

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
    library: null,
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

    onFetchLibrary: function () {
        var me = this;

        ProfileApi.getLibrary().then(function(library) {
            me.library = library;
            me.doTrigger();
        });
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

    onAddToLibrary: function (listing) {
        var me = this;

        ProfileApi.addListingToLibrary(listing).then(function(libraryEntry) {
            me.library = me.library.concat(libraryEntry);
            me.doTrigger();
        });
    },

    onRemoveFromLibrary: function (listing) {
        var me = this;

        ProfileApi.removeListingFromLibrary(listing).then(function() {
            var toRemove = _.find(me.library, {
                listing: {
                    id: listing.id
                }
            });
            me.library = _.without(me.library, toRemove);
            me.doTrigger();
        });
    },

    getDefaultData: function () {
        return _.pick(this, 'currentUser', 'currentUserError', 'library');
    }
});

module.exports = SelfStore;
