'use strict';

var React = require('react');
var Reflux = require('reflux');

var SelfStore = require('../../stores/SelfStore');
var ProfileActions = require('../../actions/ProfileActions');

var Modal = require('../Modal.jsx');

var SettingsWindow = React.createClass({
    mixins: [Reflux.connect('SelfStore')],

    getInitialState: function() {
        return {currentUser: { launchInWebtop: false }};
    },

    render: function() {
        var launchInWebtop = this.state.currentUser.launchInWebtop;

        return (
            <Modal ref="modal" className="settings-window" title="Settings"
                    cancel="Cancel" confirm="Save"
                    handleCancel={this.close} handleConfirm={this.save}>
                <dl>
                    <dt>
                        Default Application Launch
                        <small>
                            When you click on a listing, this is how
                            your listing will open
                        </small>
                    </dt>
                    <dd>
                        <label>
                            <input ref="launchInWebtop" type="checkbox" value={launchInWebtop}/>
                            Open in Webtop
                        </label>
                    </dd>
                </dl>
            </Modal>
        );
    },

    shouldComponentUpdate: function(newProps, newState) {
        return newState.launchInWebtop !== this.state.launchInWebtop;
    },

    close: function() {
        this.refs.modal.close();
    },

    save: function() {
        var newLaunchInWebtop = this.refs.launchInWebtop.getDOMNode().value;

        ProfileActions.updateLaunchPreference(newLaunchInWebtop);
        this.close();
    }
});

module.exports = SettingsWindow;
