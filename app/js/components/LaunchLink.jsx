'use strict';

var React = require('react');
var Reflux = require('reflux');

var WebtopLaunchLink = require('./WebtopLaunchLink.jsx');
var TabLaunchLink = require('./TabLaunchLink.jsx');

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

        //newTab can either be a boolean or an object.  If it is an object
        //it should have the boolean properties 'webtop' and 'tab' indicating whether to open a
        //new tab in the case of launching to webtop, or launching directly into a browsing
        //context, respectively
        newTab: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.object
        ]),

        // Callback called on click, passing information about whether a WebtopLaunchLink or TabLaunchLink
        // was created
        afterClick: React.PropTypes.func
    },

    getInitialState: function() {
        return getState(SelfStore.getDefaultData());
    },

    onStoreUpdate: function(profileData) {
        this.setState(getState(profileData));
    },

    render: function() {
        var launchInWebtop = this.state.launchInWebtop,
            { children, newTab, afterClick, ...otherProps } = this.props,
            Component,
            openInNewTab;

        if (launchInWebtop) {
            Component = WebtopLaunchLink;
            openInNewTab = typeof newTab === 'object' ? newTab.webtop : newTab;
        }
        else {
            Component = TabLaunchLink;
            openInNewTab = typeof newTab === 'object' ? newTab.tab : newTab;
        }

        return (
            <Component newTab={openInNewTab} {...otherProps} onClick={()=>{
                if(afterClick !== undefined) {
                    afterClick(launchInWebtop);
                }
            }}>
                {children}
            </Component>
        );
    }
});

module.exports = LaunchLink;
