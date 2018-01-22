'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');

var $ = require('jquery');

var ProfileActions = require('../../actions/ProfileActions');

/* global describe, it */
describe('CurrentProfileStore', function() {

    it('defaults to a null profile and empty array of ownedListings', function() {
        var CurrentProfileStore = require('../CurrentProfileStore'),
            defaultData = CurrentProfileStore.getDefaultData();

        expect(defaultData.profile).to.be.null();
        expect(defaultData.ownedListings).to.be.a('array');
        expect(defaultData.ownedListings.length).to.equal(0);

        //remove action listenens so later tests don't get messed up
        CurrentProfileStore.stopListeningToAll();
    });

    it('calls ProfileApi and then triggers in response to fetchOwnedListings', function(done) {
        var apiDeferred = $.Deferred(),
            getOwnedListingsSpy = sinon.spy(function() {
                return apiDeferred.promise();
            }),
            storeTriggerSpy = sinon.spy(),
            ownedListings = [{
                title: 'Listing 1',
                id: 1
            }, {
                title: 'Listing 2',
                id: 2
            }];

        var currentProfileStoreLoader = require('inject?../api/Profile!../CurrentProfileStore'),
            CurrentProfileStore = currentProfileStoreLoader({
                '../api/Profile': {
                    getOwnedListings: getOwnedListingsSpy
                }
            });

        CurrentProfileStore.listen(storeTriggerSpy);

        ProfileActions.fetchOwnedListings.listen(function() {
            expect(getOwnedListingsSpy.calledOnce).to.be.true();
            expect(getOwnedListingsSpy.calledWith()).to.be.true();

            apiDeferred.resolve(ownedListings);
            setTimeout(function() {
                expect(storeTriggerSpy.calledOnce).to.be.true();
                expect(storeTriggerSpy.calledWithMatch({
                    profile: null,
                    ownedListings: ownedListings
                })).to.be.true();

                //remove action listenens so later tests don't get messed up
                CurrentProfileStore.stopListeningToAll();

                done();
            });
        });

        ProfileActions.fetchOwnedListings();
    });

    it('calls ProfileApi and then triggers on response to fetchProfile', function(done) {
        var apiDeferred = $.Deferred(),
            getProfileSpy = sinon.spy(function() {
                return apiDeferred.promise();
            }),
            storeTriggerSpy = sinon.spy(),
            profile = {
                username: 'testAdmin1',
                displayName: 'Test User 1',
                id: 23
            };

        var currentProfileStoreLoader = require('inject?../api/Profile!../CurrentProfileStore'),
            CurrentProfileStore = currentProfileStoreLoader({
                '../api/Profile': {
                    getProfile: getProfileSpy
                }
            });

        CurrentProfileStore.listen(storeTriggerSpy);

        ProfileActions.fetchProfile.listen(function() {
            expect(getProfileSpy.calledOnce).to.be.true();
            expect(getProfileSpy.calledWith()).to.be.true();

            apiDeferred.resolve(profile);
            setTimeout(function() {
                expect(storeTriggerSpy.calledOnce).to.be.true();
                expect(storeTriggerSpy.calledWithMatch({
                    profile: profile,
                    ownedListings: []
                })).to.be.true();

                //remove action listenens so later tests don't get messed up
                CurrentProfileStore.stopListeningToAll();

                done();
            });
        });

        ProfileActions.fetchProfile();
    });

    it('always returns the most recently fetched values for both profile and ownedListings',
            function(done) {
        var getProfileDeferred = $.Deferred(),
            getProfileSpy = sinon.spy(function() {
                return getProfileDeferred.promise();
            }),
            getOwnedListingsDeferred = $.Deferred(),
            getOwnedListingsSpy = sinon.spy(function() {
                return getOwnedListingsDeferred.promise();
            }),
            storeTriggerSpy = sinon.spy(),
            profile = {
                username: 'testAdmin1',
                displayName: 'Test User 1',
                id: 23
            },
            ownedListings = [{
                title: 'Listing 1',
                id: 1
            }, {
                title: 'Listing 2',
                id: 2
            }];

        var currentProfileStoreLoader = require('inject?../api/Profile!../CurrentProfileStore'),
            CurrentProfileStore = currentProfileStoreLoader({
                '../api/Profile': {
                    getProfile: getProfileSpy,
                    getOwnedListings: getOwnedListingsSpy
                }
            });

        CurrentProfileStore.listen(storeTriggerSpy);

        ProfileActions.fetchProfile.listen(function() {
            expect(getProfileSpy.calledOnce).to.be.true();
            expect(getProfileSpy.calledWith()).to.be.true();

            getProfileDeferred.resolve(profile);
            setTimeout(function() {
                expect(storeTriggerSpy.calledOnce).to.be.true();
                expect(storeTriggerSpy.calledWithMatch({
                    profile: profile,
                    ownedListings: []
                })).to.be.true();
            });

            ProfileActions.fetchOwnedListings.listen(function() {
                expect(getOwnedListingsSpy.calledOnce).to.be.true();
                expect(getOwnedListingsSpy.calledWith()).to.be.true();
                expect(getProfileSpy.calledOnce).to.be.true();
                expect(getProfileSpy.calledWith()).to.be.true();

                getOwnedListingsDeferred.resolve(ownedListings);
                setTimeout(function() {
                    expect(storeTriggerSpy.calledTwice).to.be.true();
                    expect(storeTriggerSpy.calledWithMatch({
                        profile: profile, //the important part here is that this isn't null
                        ownedListings: ownedListings
                    })).to.be.true();
                });
                //remove action listenens so later tests don't get messed up
                CurrentProfileStore.stopListeningToAll();

                done();
            });

            ProfileActions.fetchOwnedListings();
        });

        ProfileActions.fetchProfile();
    });
});
