'use strict';

var React = require('react');
var Reflux = require('reflux');

var Modal = require('../Modal');

var { Navigation, History } = require('react-router');

var CurrentProfileStore = require('../../stores/CurrentProfileStore');
var ProfileActions = require('../../actions/ProfileActions');

var ListingRow = React.createClass({

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        linkEl: React.PropTypes.func.isRequired
    },

    render: function() {
        var listing = this.props.listing,
            Link = this.props.linkEl;

        /* jshint ignore:start */
        return (
            <li className="listing">
                <Link listingId={listing.id}>
                    <img src={listing.imageMediumUrl} />
                    {listing.title}
                </Link>
            </li>
        );
        /* jshint ignore:end */
    }
});

var ProfileInfo = React.createClass({
    mixins: [Reflux.connect(CurrentProfileStore)],

    propTypes: {
        profileId: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        listingLinkEl: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {profile: null, ownedListings: []};
    },

    componentWillMount: function() {
        ProfileActions.fetchProfile(this.props.profileId);
        ProfileActions.fetchOwnedListings(this.props.profileId);
    },

    render: function() {
        /* jshint ignore:start */
        var profile = this.state.profile,
            linkEl = this.props.listingLinkEl,
            listings = this.state.ownedListings.map(
                l => <ListingRow key={l.id} linkEl={linkEl} listing={l} />
            );

        if (profile) {
            return (
                <section className="profile-info">
                    <dl>
                        <dt>Name</dt><dd>{profile.displayName}</dd>
                        <dt>Username</dt><dd>{profile.username}</dd>
                        <dt>Email</dt><dd>{profile.email || 'none available'}</dd>
                    </dl>
                    <section className="owned-listings">
                        <header>
                            <h4>{profile.displayName}'s Listings</h4>
                            <small>A list of the Marketplace listings that this user owns</small>
                        </header>
                        <ul>{listings}</ul>
                    </section>
                </section>
            );
        }
        else {
            return (
                <span className="loading">Loading profile information…</span>
            );
        }
        /* jshint ignore:end */
    }
});

var ProfileWindow = React.createClass({
    mixins: [Navigation],

    propTypes: {
        profileId: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        listingLinkEl: React.PropTypes.func.isRequired,

        //the route that should be set when the window is closed.
        //Can also be a function that changes the route
        //(this allows "goBack" to be used instead of an explicit route)
        backRoute: React.PropTypes.oneOfType([
            React.PropTypes.string.isRequired,
            React.PropTypes.func.isRequired
        ])
    },

    render: function() {
        /* jshint ignore:start */
        return (
            <Modal ref="modal" className="profile-window" size="small">
                <header>
                    <h3>Profile</h3>
                    <button className="close" onClick={this.close}>×</button>
                </header>
                <ProfileInfo profileId={this.props.profileId}
                    listingLinkEl={this.props.listingLinkEl} />
            </Modal>
        );
        /* jshint ignore:end */
    },

    close: function() {
        var backRoute = this.props.backRoute;

        this.refs.modal.close();

        if (typeof backRoute === 'function') {
            backRoute();
        }
        else {
            this.transitionTo(this.props.backRoute);
        }
    }
});

module.exports = ProfileWindow;
