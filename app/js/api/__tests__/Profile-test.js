'use strict';

var $ = require('jquery');

var sinon = require('sinon');
var expect = require('chai').expect;

var { apiListing } = require('./test-listing-data');
var { apiProfile, centerProfile } = require('./test-profile-data');

/* global describe, it */
describe.only('ProfileApi', function() {
    describe('getOwnedListings', function() {
        it('properly constructs the URL', function() {
            var apiUrl = 'https://widgethome:8443/marketplace',
                getJSONSpy = sinon.spy(function() {
                    return $.Deferred().promise();
                });

            var ProfileApiLoader = require('inject?../OzoneConfig&jquery!../Profile');
            var ProfileApi = ProfileApiLoader({
                '../OzoneConfig': { API_URL: apiUrl },
                jquery: { getJSON: getJSONSpy }
            });

            ProfileApi.getOwnedListings();

            expect(getJSONSpy.calledOnce).to.be.true();
            expect(getJSONSpy.calledWith(
                'https://widgethome:8443/marketplace/api/self/listing/')).to.be.true();
        });

        it('returns a promise wrapping the list of listings (in API format)', function(done) {
            var serverResponseBody = apiListing,
                ajaxDeferred = $.Deferred(),
                getJSONSpy = sinon.spy(function() {
                    return ajaxDeferred.promise();
                });

            var profileApiLoader = require('inject?jquery!../Profile');
            var ProfileApi = profileApiLoader({
                jquery: { getJSON: getJSONSpy }
            });

            var promise = ProfileApi.getOwnedListings();

            expect(promise.state()).to.equal('pending');

            promise.done(function(data) {
                expect(data.length).to.equal(2);
                expect(data[0].launchUrl).to.equal(apiListing[0].launch_url);
                expect(data[1].title).to.equal(apiListing[1].title);
                done();
            });

            ajaxDeferred.resolve(serverResponseBody);
        });
    });

    describe('getProfile', function() {
        it('properly constructs the URL', function() {
            var apiUrl = 'https://widgethome:8443/marketplace',
                getJSONSpy = sinon.spy(function() {
                    return $.Deferred().promise();
                });

            var profileApiLoader = require('inject?../OzoneConfig&jquery!../Profile');
            var ProfileApi = profileApiLoader({
                '../OzoneConfig': { API_URL: apiUrl },
                jquery: { getJSON: getJSONSpy }
            });

            ProfileApi.getProfile();

            expect(getJSONSpy.calledOnce).to.be.true();
            expect(getJSONSpy.calledWith(
                'https://widgethome:8443/marketplace/api/self/profile/')).to.be.true();
        });

        it('returns a promise wrapping the profile data', function(done) {
            var profileId = 1,
                serverResponseBody = apiProfile,
                ajaxDeferred = $.Deferred(),
                getJSONSpy = sinon.spy(function() {
                    return ajaxDeferred.promise();
                });

            var profileApiLoader = require('inject?jquery!../Profile');
            var ProfileApi = profileApiLoader({
                jquery: { getJSON: getJSONSpy }
            });

            var promise = ProfileApi.getProfile(profileId);

            expect(promise.state()).to.equal('pending');

            promise.done(function(data) {
                expect(data.username).to.equal(centerProfile.username);
                expect(data.organizations).to.deep.equal(centerProfile.organizations);
                expect(data.stewardedOrganizations).to.deep.equal(centerProfile.stewardedOrganizations);
                expect(data).to.deep.equal(centerProfile);
                done();
            });

            ajaxDeferred.resolve(serverResponseBody);
        });
    });
});
