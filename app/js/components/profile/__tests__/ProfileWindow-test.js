'use strict';

var Reflux = require('reflux');

var $ = require('jquery');

var expect = require('chai').expect;
var sinon = require('sinon');

var TestUtils = require('react').addons.TestUtils;

/* global describe, it */
describe('ProfileWindow', function() {
    it('fetches the profile and owned listings when mounted', function() {
        var fetchProfileSpy = sinon.spy(),
            fetchOwnedListingsSpy = sinon.spy();

        var profileId = 1;

        var profileWindowLoader = require('inject?../../actions/ProfileActions&reflux&../../stores/CurrentProfileStore&react-router!../ProfileWindow.jsx');
        var ProfileWindow = profileWindowLoader({
            '../../stores/CurrentProfileStore': null,
            reflux: {
                connect: function() {}
            },
            '../../actions/ProfileActions': {
                fetchProfile: fetchProfileSpy,
                fetchOwnedListings: fetchOwnedListingsSpy
            },
            'react-router': {
                Navigation: null
            }
        });

        TestUtils.renderIntoDocument(
            <ProfileWindow
                profileId={profileId}
                listingLinkEl={() => undefined}
                backRoute={''} />
        );

        expect(fetchProfileSpy.calledOnce).to.be.true();
        expect(fetchProfileSpy.calledWith(profileId)).to.be.true();

        expect(fetchOwnedListingsSpy.calledOnce).to.be.true();
        expect(fetchOwnedListingsSpy.calledWith(profileId)).to.be.true();
    });

    it('renders information from the CurrentProfileStore', function() {
        var CurrentProfileStoreMock = Reflux.createStore({});

        var profileId = 1;

        var profileWindowLoader = require('inject?../../actions/ProfileActions&../../stores/CurrentProfileStore&react-router!../ProfileWindow.jsx');
        var ProfileWindow = profileWindowLoader({
            '../../stores/CurrentProfileStore': CurrentProfileStoreMock,
            '../../actions/ProfileActions': {
                fetchProfile: function() {},
                fetchOwnedListings: function() {}
            },
            'react-router': {
                Navigation: null
            }
        });

        var LinkMock = React.createClass({
            render: function() {
                return (
                    <a href={this.props.listingId}>{this.props.children}</a>
                );
            }
        });

        var element = TestUtils.renderIntoDocument(
            <ProfileWindow
                profileId={profileId}
                listingLinkEl={LinkMock}
                backRoute={''} />
        );

        var storeData = {
            profile: {
                displayName: 'Test User 1',
                username: 'testUser1',
                email: 'testUser1@example.com'
            },
            ownedListings: [{
                id: 1,
                "largeIcon": {
                    "url": "http://localhost:8181/api/image/7/",
                    "id": 7,
                    "accessControl": {
                        "title": "UNCLASSIFIED"
                    }
                },
                isEnabled:true,
                approvalStatus: "APPROVED",
                isDeleted:false,
                title: 'Listing 1'
            }, {
                id: 2,
                "largeIcon": {
                    "url": "http://localhost:8181/api/image/7/",
                    "id": 7,
                    "accessControl": {
                        "title": "UNCLASSIFIED"
                    }
                },
                isEnabled:true,
                approvalStatus: "APPROVED",
                isDeleted:true,
                title: 'Listing 2'
            }]
        };

        CurrentProfileStoreMock.trigger(storeData);
        var infoText = $(element.getDOMNode()).find('section').text();
        expect(infoText.indexOf(storeData.profile.displayName)).to.not.equal(-1);
        expect(infoText.indexOf(storeData.profile.email)).to.not.equal(-1);
        expect(infoText.indexOf(storeData.profile.username)).to.not.equal(-1);

        var links = $(element.getDOMNode()).find('.owned-listings a');
        expect(links.length).to.equal(1);

        var linkImagePaths = links.map(l => $(l).children('img').attr('src')).get();
        linkImagePaths.forEach(function(path, i) {
            expect(path).to.equal(storeData.ownedListings[i].imageMediumUrl);
        });

        var linkTexts = links.map(l => l.innerText).get();
        linkTexts.forEach(function(text, i) {
            expect(text).to.equal(storeData.ownedListings[i].title);
        });
    });

    it('renders a loading message when the profile info is not present', function() {
        var CurrentProfileStoreMock = Reflux.createStore({});

        var profileId = 1;

        var profileWindowLoader = require('inject?../../actions/ProfileActions&../../stores/CurrentProfileStore&react-router!../ProfileWindow.jsx');
        var ProfileWindow = profileWindowLoader({
            '../../stores/CurrentProfileStore': CurrentProfileStoreMock,
            '../../actions/ProfileActions': {
                fetchProfile: function() {},
                fetchOwnedListings: function() {}
            },
            'react-router': {
                Navigation: null
            }
        });

        var element = TestUtils.renderIntoDocument(
            <ProfileWindow
                profileId={profileId}
                listingLinkEl={() => undefined}
                backRoute={''} />
        );

        expect($(element.getDOMNode()).find('.loading')).to.be.ok();

        CurrentProfileStoreMock.trigger({profile: null, ownedListings: []});

        expect($(element.getDOMNode()).find('.loading')).to.be.ok();
    });

    it('uses the provided listingLinkEl to render links', function() {
        var CurrentProfileStoreMock = Reflux.createStore({});

        var profileId = 1;

        var profileWindowLoader = require('inject?../../actions/ProfileActions&../../stores/CurrentProfileStore&react-router!../ProfileWindow.jsx');
        var ProfileWindow = profileWindowLoader({
            '../../stores/CurrentProfileStore': CurrentProfileStoreMock,
            '../../actions/ProfileActions': {
                fetchProfile: function() {},
                fetchOwnedListings: function() {}
            },
            'react-router': {
                Navigation: null
            }
        });

        var LinkMock = React.createClass({
            render: function() {
                expect(this.props.children).to.be.ok();

                return (
                    <a className="link-mock" href={this.props.listingId}></a>
                );
            }
        });

        var element = TestUtils.renderIntoDocument(
            <ProfileWindow
                profileId={profileId}
                listingLinkEl={LinkMock}
                backRoute={''} />
        );

        var storeData = {
            profile: {
                displayName: 'Test User 1',
                username: 'testUser1',
                email: 'testUser1@example.com'
            },
            ownedListings: [{
                id: 1,
                "largeIcon": {
                    "url": "http://localhost:8181/api/image/7/",
                    "id": 7,
                    "accessControl": {
                        "title": "UNCLASSIFIED"
                    }
                },
                isEnabled:true,
                approvalStatus: "APPROVED",
                isDeleted:false,
                title: 'Listing 1'
            }, {
                id: 2,
                "largeIcon": {
                    "url": "http://localhost:8181/api/image/7/",
                    "id": 7,
                    "accessControl": {
                        "title": "UNCLASSIFIED"
                    }
                },
                isEnabled:true,
                approvalStatus: "APPROVED",
                isDeleted:true,
                title: 'Listing 2'
            }]
        };

        CurrentProfileStoreMock.trigger(storeData);

        var links = $(element.getDOMNode()).find('.owned-listings a.link-mock');
        expect(links.length).to.equal(1);
    });

    it('transitions to backRoute on close if backRoute is a string', function() {
        var CurrentProfileStoreMock = Reflux.createStore({});

        var profileId = 1;
        var backRoute = '#backRoute';
        var transitionToSpy = sinon.spy();

        var profileWindowLoader = require('inject?../../actions/ProfileActions&../../stores/CurrentProfileStore&react-router!../ProfileWindow.jsx');
        var ProfileWindow = profileWindowLoader({
            '../../stores/CurrentProfileStore': CurrentProfileStoreMock,
            '../../actions/ProfileActions': {
                fetchProfile: function() {},
                fetchOwnedListings: function() {}
            },
            'react-router': {
                Navigation: {
                    transitionTo: transitionToSpy
                }
            }
        });

        var element = TestUtils.renderIntoDocument(
            <ProfileWindow
                profileId={profileId}
                listingLinkEl={() => undefined}
                backRoute={backRoute} />
        );

        var closeBtn = $(element.getDOMNode()).find('.close')[0];

        TestUtils.Simulate.click(closeBtn);

        expect(transitionToSpy.calledOnce).to.be.true();
        expect(transitionToSpy.calledWithExactly(backRoute)).to.be.true();
    });

    it('calls backRoute on close if it is a function', function() {
        var CurrentProfileStoreMock = Reflux.createStore({});

        var profileId = 1;
        var backRoute = sinon.spy();

        var profileWindowLoader = require('inject?../../actions/ProfileActions&../../stores/CurrentProfileStore&react-router!../ProfileWindow.jsx');
        var ProfileWindow = profileWindowLoader({
            '../../stores/CurrentProfileStore': CurrentProfileStoreMock,
            '../../actions/ProfileActions': {
                fetchProfile: function() {},
                fetchOwnedListings: function() {}
            },
            'react-router': {
                Navigation: null
            }
        });

        var element = TestUtils.renderIntoDocument(
            <ProfileWindow
                profileId={profileId}
                listingLinkEl={() => undefined}
                backRoute={backRoute} />
        );

        var closeBtn = $(element.getDOMNode()).find('.close')[0];

        TestUtils.Simulate.click(closeBtn);

        expect(backRoute.calledOnce).to.be.true();
    });
});
