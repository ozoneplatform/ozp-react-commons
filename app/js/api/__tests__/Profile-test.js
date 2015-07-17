'use strict';

var $ = require('jquery');

var sinon = require('sinon');
var expect = require('chai').expect;

/* global describe, it */
describe('ProfileApi', function() {
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
                'https://widgethome:8443/marketplace/api/listing/')).to.be.true();
        });

        it('returns a promise wrapping the list of listings', function(done) {
            var profileId = 2,
                items = [
                    {title: 'Listing 1'},
                    {title: 'Listing 2'}
                ],
                serverResponseBody = {
                    _embedded: {
                        item: items
                    }
                },
                ajaxDeferred = $.Deferred(),
                getJSONSpy = sinon.spy(function() {
                    return ajaxDeferred.promise();
                });

            var profileApiLoader = require('inject?jquery!../Profile');
            var ProfileApi = profileApiLoader({
                jquery: { getJSON: getJSONSpy }
            });

            var promise = ProfileApi.getOwnedListings(profileId);

            expect(promise.state()).to.equal('pending');

            promise.done(function(data) {
                expect(data.length).to.equal(2);
                expect(data[0].title).to.equal(items[0].title);
                expect(data[1].title).to.equal(items[1].title);

                done();
            });

            ajaxDeferred.resolve(serverResponseBody);
        });

        it('returns a promise wrapping an empty list if the response is missing ' +
                '`_embedded` or `item`', function() {
            var profileId = 2,
                ajaxDeferred = $.Deferred(),
                getJSONSpy = sinon.spy(function() {
                    return ajaxDeferred.promise();
                }),
                doneSpy = sinon.spy(function(data) {
                    expect(data).to.be.a('array');
                    expect(data.length).to.equal(0);
                });

            var profileApiLoader = require('inject?jquery!../Profile');
            var ProfileApi = profileApiLoader({
                jquery: { getJSON: getJSONSpy }
            });

            var promise = ProfileApi.getOwnedListings(profileId);
            promise.done(doneSpy);

            //check missing _embedded
            ajaxDeferred.resolve({});

            ajaxDeferred = $.Deferred();
            promise = ProfileApi.getOwnedListings(profileId);
            promise.done(doneSpy);

            //check missing _embedded.item
            ajaxDeferred.resolve({_embedded: {}});

            expect(doneSpy.calledTwice).to.be.true();
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
            var profileId = 2,
                serverResponseBody = {
                    username: 'testUser1',
                    displayName: 'Test User 1',
                    id: 2
                },
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
                expect(data).to.equal(serverResponseBody);
                done();
            });

            ajaxDeferred.resolve(serverResponseBody);
        });
    });
});
