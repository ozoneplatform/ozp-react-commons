'use strict';

var React = require('react');
var Reflux = require('reflux');

var Modal = require('../Modal.jsx');

var { Navigation } = require('react-router');

var CurrentProfileStore = require('../../stores/CurrentProfileStore');
var ProfileActions = require('../../actions/ProfileActions');
var { API_URL } = require('ozp-react-commons/OzoneConfig');

var ListingRow = React.createClass({

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        linkEl: React.PropTypes.func.isRequired
    },

    render: function() {
        var listing = this.props.listing,
            Link = this.props.linkEl,
            imageUrl = API_URL + '/api/image/' + listing.largeIcon.id + '/';

        return (
            <li className="listing">
                <Link listingId={listing.id}>
                    <img src={imageUrl} />
                    {listing.title}
                </Link>
            </li>
        );
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
                            <small>A list of the Center listings that this user owns</small>
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
        return (
            <Modal title="Profile" ref="modal"
                    className="profile-window" size="small"
                    onCancel={this.close}>
                <ProfileInfo profileId={this.props.profileId}
                    listingLinkEl={this.props.listingLinkEl} />
            </Modal>
        );
    },

    close: function() {
        var backRoute = this.props.backRoute;

        if (typeof backRoute === 'function') {
            backRoute();
        }
        else {
            this.transitionTo(this.props.backRoute);
        }
    }
});

module.exports = ProfileWindow;
