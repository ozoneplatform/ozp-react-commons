'use strict';

var React = require('react');
var Reflux = require('reflux');

var Modal = require('../Modal.jsx');

var { Navigation } = require('react-router');
var CurrentProfileStore = require('../../stores/CurrentProfileStore');
var ProfileActions = require('../../actions/ProfileActions');
var CategorySubscriptions = require('./CategorySubscriptions.jsx');
var TagSubscriptions = require('./TagSubscriptions.jsx');
var LoadIndicator = require('../LoadIndicator.jsx');
var { API_URL } = require('../../OzoneConfig');
var DEFAULT_ICON = 1  // TODO: Replace with something other than Android icon
var TagSubscriptionActions = require('../../actions/TagSubscriptionActions');
var TagSubscriptionStore = require('../../stores/TagSubscriptionStore');
var CategorySubscriptionActions = require('../../actions/CategorySubscriptionActions');
var CategorySubscriptionStore = require('../../stores/CategorySubscriptionStore');

var ListingRow = React.createClass({

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        linkEl: React.PropTypes.func.isRequired
    },

    render: function() {
        var listing = this.props.listing,
            Link = this.props.linkEl,
            iconId = listing.largeIcon ? listing.largeIcon.id : DEFAULT_ICON,
            imageUrl = API_URL + '/api/image/' + iconId + '/';

        return (
            <li className="listing col-md-6">
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
        return {profile: null, ownedListings: [], loading: true, loadingError: false};
    },

    componentWillMount: function() {
        ProfileActions.fetchProfile(this.props.profileId);
        ProfileActions.fetchOwnedListings(this.props.profileId);
    },

    toggleFlags: function(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        var profile = this.state.profile;

        switch (target.id) {
            case 'email':
                this.setState({
                    emailNotificationFlag: value
                });
                profile.emailNotificationFlag = value;
                break;
            case 'listing':
                this.setState({
                    listingNotificationFlag: value
                });
                profile.listingNotificationFlag = value;
                break;
            case 'subscription':
                this.setState({
                    subscriptionNotificationFlag: value
                });
                profile.subscriptionNotificationFlag = value;
                break;
            case 'leaveOzpFlag':
                this.setState({
                    leavingOzpWarningFlag: value
                });
                profile.leavingOzpWarningFlag = value;
            default:
        }

        ProfileActions.updateProfileFlags(profile);
    },

    renderPreferences: function() {
        var notificationTip = null,
            preferences = null,
            profile = this.state.profile;

        if (!profile.listingNotificationFlag && !profile.emailNotificationFlag && !profile.subscriptionNotificationFlag) {
            notificationTip = <h6 className="notification-tip">You will still receive critical notifications from the system</h6>;
        }

        preferences = <div>
            <h4>Preferences</h4>
            {notificationTip}
            <input type="checkbox" className="switch-checkbox" id="email" defaultChecked={profile.emailNotificationFlag} onChange={this.toggleFlags}/>
            <label className="switch switch-label" htmlFor="email">
                <span className="switch-inner"></span>
                <span className="switch-slider"></span>
            </label>
            <h5 className="switch-text">Email Notifications</h5><br/>
            <input type="checkbox" className="switch-checkbox" id="listing" defaultChecked={profile.listingNotificationFlag} onChange={this.toggleFlags}/>
            <label className=" switch switch-label" htmlFor="listing">
                <span className="switch-inner"></span>
                <span className="switch-slider"></span>
            </label>
            <h5 className="switch-text">Listing Notifications</h5><br/>
            <input type="checkbox" className="switch-checkbox" id="subscription" defaultChecked={profile.subscriptionNotificationFlag} onChange={this.toggleFlags}/>
            <label className="switch switch-label" htmlFor="subscription">
                <span className="switch-inner"></span>
                <span className="switch-slider"></span>
            </label>
            <h5 className="switch-text">Subscription Notifications</h5><br/>
            <input type="checkbox" className="switch-checkbox" id="leaveOzpFlag" defaultChecked={profile.leavingOzpWarningFlag} onChange={this.toggleFlags}/>
            <label className="switch switch-label" htmlFor="leaveOzpFlag">
                <span className="switch-inner"></span>
                <span className="switch-slider"></span>
            </label>
            <h5 className="switch-text">Show Launch Requirements Notice</h5>
            <h4>Category Subscriptions</h4>
            <CategorySubscriptions/>
            <h4>Tag Subscriptions</h4>
            <TagSubscriptions/>
        </div>;

        return preferences;
    },

    render: function() {
        var profile = this.state.profile,
            linkEl = this.props.listingLinkEl,
            listings = this.state.ownedListings.map(function(l){
                if (CurrentProfileStore.isSelf && !l.isDeleted){
                    return <ListingRow key={l.id} linkEl={linkEl} listing={l} />;
                }else if (l.isEnabled && !l.isDeleted && (l.approvalStatus == "APPROVED")){
                    return <ListingRow key={l.id} linkEl={linkEl} listing={l} />;
                }
                return;
            });

        if (profile) {
            var orgs = this.state.profile.organizations.map(function (org, i){
                return <span className="company" key={i}>{org}</span>;
            });

            return (
                <section>
                    <div className="col-md-4 col-sm-6">
                        <i className="icon-head-60-grayLighter" />
                        <h2>{profile.displayName}</h2>
                        <p><b>{profile.username}</b>
                        {orgs}<br/>
                        {profile.email}</p>
                    </div>
                    <div className="col-md-8">
                        <div className="row col-md-12 col-sm-6 owned-listings">
                            {CurrentProfileStore.isSelf ? this.renderPreferences() : null}
                        </div>
                        <div className="row col-md-12 col-sm-6 owned-listings">
                            <h4>{profile.displayName}'s Listings</h4>
                            {this.state.loading ?
                                <LoadIndicator/> :
                                 listings.length < 1 ?
                                    <p>You have not created any listings yet. To start, submit a listing from the global menu.</p> : <ul>{listings}</ul>
                            }
                        </div>
                    </div>
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
    mixins: [Reflux.connect(CategorySubscriptionStore, "categorySubscriptionStore"), Reflux.connect(TagSubscriptionStore, "tagSubscriptionStore"), Navigation],

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
            <Modal modaltitle="Profile" ref="modal"
                    className="profile-window"
                    onCancel={this.close}>
                <ProfileInfo profileId={this.props.profileId}
                    listingLinkEl={this.props.listingLinkEl} />
            </Modal>
        );
    },

    componentDidMount: function () {
        TagSubscriptionActions.fetchSubscriptions();
        CategorySubscriptionActions.fetchSubscriptions();
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
