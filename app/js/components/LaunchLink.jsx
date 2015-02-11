'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('../utils/_');

var WebtopLaunchLink = require('./WebtopLaunchLink.jsx');

var SelfStore = require('../stores/SelfStore');

function getState(profileData) {
    var profile = profileData.currentUser,
        launchInWebtop = profile ? profile.launchInWebtop : false;

    return {launchInWebtop: launchInWebtop};
}

/**
 * A link for launching applications.  Depending on the user's preference,
 * this will either launch into webtop or just open the application
 */
var LaunchLink = React.createClass({
    mixins: [Reflux.listenTo(SelfStore, 'onStoreUpdate')],

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        newTab: React.PropTypes.bool
    },

    getInitialState: function() {
        return getState(SelfStore.getDefaultData());
    },

    onStoreUpdate: function(profileData) {
        this.setState(getState(profileData));
    },

    render: function() {
        var launchInWebtop = this.state.launchInWebtop,
            linkChildren = <span className="icon-open"></span>,
            { children, newTab, ...otherProps } = this.props,
            anchorOtherProps = _.omit(otherProps, 'href', 'target');

        return (
            launchInWebtop ?
                <WebtopLaunchLink {...otherProps}
                        newTab={newTab}
                        listing={this.props.listing} >
                    {children}
                </WebtopLaunchLink>
                :
                <a {...anchorOtherProps}
                        href={this.props.listing.launchUrl}
                        target={newTab ? '_blank' : '_self'}>
                    {children}
                </a>
        );
    }
});

module.exports = LaunchLink;
