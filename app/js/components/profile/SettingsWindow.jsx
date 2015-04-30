'use strict';

var React = require('react');
var Reflux = require('reflux');

var { Navigation } = require('react-router');

var SelfStore = require('../../stores/SelfStore');
var ProfileActions = require('../../actions/ProfileActions');

var Modal = require('../Modal.jsx');

var Toggle = React.createClass({
    propTypes: {
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired
    },

    render: function() {
        return (
            <label className="switch">
                <input type="checkbox" className="ios"
                    onChange={this.props.onChange} checked={this.props.checked} />
                <div className="track"><div className="knob"/></div>
                {this.props.children}
            </label>
        );
    }
});

function getStoreState(profileData) {
    var profile = profileData.currentUser,
        launchInWebtop = profile ? profile.launchInWebtop : undefined;

    return {
        initialLaunchInWebtop: launchInWebtop,
        launchInWebtop: launchInWebtop
    };
}

/**
 * A modal window that allows the user to update their preferences
 */
var SettingsWindow = React.createClass({
    mixins: [Reflux.listenTo(SelfStore, 'onStoreChange'), Navigation],

    propsTypes: {
        backRoute: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return getStoreState(SelfStore.getDefaultData());
    },

    render: function() {
        var launchText = this.state.launchInWebtop ? "Open in Webtop" : "Open in New Tab";
    
        return (
            <Modal ref="modal" className="settings-window" title="Settings"
                    cancel="Cancel" confirm="Save"
                    onCancel={this.close} onConfirm={this.save}>
                <dl>
                    <dt>
                        Default Application Launch
                        <small>
                            When you click on a listing, this is how
                            your listing will open
                        </small>
                    </dt>
                    <dd>
                        <Toggle ref="launchInWebtop"
                                onChange={this.onLaunchInWebtopChange}
                                checked={this.state.launchInWebtop}>
                            {launchText}
                        </Toggle>
                    </dd>
                </dl>
            </Modal>
        );
    },

    shouldComponentUpdate: function(newProps, newState) {
        return newState.launchInWebtop !== this.state.launchInWebtop ||
            newState.initialLaunchInWebtop !== this.state.initialLaunchInWebtop;
    },

    onStoreChange: function(profileData) {
        this.setState(getStoreState(profileData));
    },

    onLaunchInWebtopChange: function(e) {
        this.setState({launchInWebtop: e.target.checked});
    },

    close: function() {
        this.transitionTo(this.props.backRoute);
    },

    save: function() {
        //if the checkbox is not in the state it started in
        if (this.state.launchInWebtop !== this.state.initialLaunchInWebtop) {
            ProfileActions.updateLaunchPreference(this.state.launchInWebtop);
        }

        this.close();
    }
});

module.exports = SettingsWindow;
