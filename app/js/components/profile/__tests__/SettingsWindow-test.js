'use strict';

var React = require('react');
var Reflux = require('reflux');
var TestUtils = React.addons.TestUtils;

var expect = require('chai').expect;
var sinon = require('sinon');

/* global describe, it */
describe('SettingsWindow', function() {
    it('updates its state when the SelfStore changes', function() {
        var data = launchInWebtop => ({currentUser: { launchInWebtop: launchInWebtop }});

        var mockStore = Reflux.createStore({
            getDefaultData: function() {
                return data(false);
            }
        });

        var settingsWindowFactory = require('inject?react-router&../../stores/SelfStore!../SettingsWindow.jsx'),
            SettingsWindow = settingsWindowFactory({
                '../../stores/SelfStore': mockStore,
                'react-router': {}
            });

        var cmp = TestUtils.renderIntoDocument(<SettingsWindow backRoute="" />);

        expect(cmp.state.initialLaunchInWebtop).to.be.false();

        mockStore.trigger(data(true));
        expect(cmp.state.initialLaunchInWebtop).to.be.true();

        mockStore.trigger(data(false));
        expect(cmp.state.initialLaunchInWebtop).to.be.false();

        mockStore.trigger(data(false));
        expect(cmp.state.initialLaunchInWebtop).to.be.false();
    });

    it('changes its launchInWebtop state when the user toggles the checkbox', function() {
        var mockStore = Reflux.createStore({
            getDefaultData: function() {
                return { currentUser: { launchInWebtop: false }};
            }
        });

        var settingsWindowFactory = require('inject?react-router&../../stores/SelfStore!../SettingsWindow.jsx'),
            SettingsWindow = settingsWindowFactory({
                '../../stores/SelfStore': mockStore,
                'react-router': {}
            });

        var cmp = TestUtils.renderIntoDocument(<SettingsWindow backRoute="" />),
            checkbox = $(cmp.refs.launchInWebtop.getDOMNode()).find('input[type=checkbox]')[0];

        expect(cmp.state.launchInWebtop).to.not.be.ok();

        TestUtils.Simulate.change(checkbox, {target: { checked: true }});
        expect(cmp.state.launchInWebtop).to.be.true();

        TestUtils.Simulate.change(checkbox, {target: { checked: false }});
        expect(cmp.state.launchInWebtop).to.be.false();

        TestUtils.Simulate.change(checkbox, {target: { checked: true }});
        expect(cmp.state.launchInWebtop).to.be.true();
    });

    it('transitions to its back route when closed', function() {
        var mockStore = Reflux.createStore({
            getDefaultData: function() {
                return { currentUser: { launchInWebtop: false }};
            }
        });

        var transitionToSpy = sinon.spy();

        var settingsWindowFactory = require('inject?react-router&../../stores/SelfStore!../SettingsWindow.jsx'),
            SettingsWindow = settingsWindowFactory({
                '../../stores/SelfStore': mockStore,
                'react-router': {
                    Navigation: {
                        transitionTo: transitionToSpy
                    }
                }
            });

        var backRoute = 'back';

        var cmp = TestUtils.renderIntoDocument(<SettingsWindow backRoute={backRoute} />),
            closeBtn = $(cmp.getDOMNode()).find('.close')[0];

        TestUtils.Simulate.click(closeBtn);

        expect(transitionToSpy.calledOnce).to.be.true();
        expect(transitionToSpy.calledWith(backRoute)).to.be.true();
    });

    it('saves and transitions to its back route when Save is clicked', function() {
        var mockStore = Reflux.createStore({
            getDefaultData: function() {
                return { currentUser: { launchInWebtop: false }};
            }
        });

        var transitionToSpy = sinon.spy();
        var updateLaunchPreferenceSpy = sinon.spy();

        var settingsWindowFactory = require('inject?react-router&../../stores/SelfStore&../../actions/ProfileActions!../SettingsWindow.jsx'),
            SettingsWindow = settingsWindowFactory({
                '../../stores/SelfStore': mockStore,
                '../../actions/ProfileActions': {
                    updateLaunchPreference: updateLaunchPreferenceSpy
                },
                'react-router': {
                    Navigation: {
                        transitionTo: transitionToSpy
                    }
                }
            });

        var backRoute = 'back';

        var cmp = TestUtils.renderIntoDocument(<SettingsWindow backRoute={backRoute} />),
            saveBtn = $(cmp.getDOMNode()).find('.modal-footer a:nth-child(2)')[0],
            checkbox = $(cmp.refs.launchInWebtop.getDOMNode()).find('input[type=checkbox]')[0];

        TestUtils.Simulate.change(checkbox, {target: {checked: true}});
        TestUtils.Simulate.click(saveBtn);

        expect(transitionToSpy.calledOnce).to.be.true();
        expect(transitionToSpy.calledWith(backRoute)).to.be.true();

        expect(updateLaunchPreferenceSpy.calledOnce).to.be.true();
    });

    it('saves the current checkbox state as the launchInWebtop pref', function() {
        var mockStore = Reflux.createStore({
            getDefaultData: function() {
                return { currentUser: { launchInWebtop: false }};
            }
        });

        var updateLaunchPreferenceSpy = sinon.spy();

        var settingsWindowFactory = require('inject?react-router&../../stores/SelfStore&../../actions/ProfileActions!../SettingsWindow.jsx'),
            SettingsWindow = settingsWindowFactory({
                '../../stores/SelfStore': mockStore,
                '../../actions/ProfileActions': {
                    updateLaunchPreference: updateLaunchPreferenceSpy
                },
                'react-router': {
                    Navigation: {
                        transitionTo: () => {}
                    }
                }
            });

        var cmp = TestUtils.renderIntoDocument(<SettingsWindow backRoute="" />),
            saveBtn = $(cmp.getDOMNode()).find('.modal-footer a:nth-child(2)');

        TestUtils.Simulate.click(saveBtn);
        expect(updateLaunchPreferenceSpy.calledOnce).to.be.false();

        cmp = TestUtils.renderIntoDocument(<SettingsWindow backRoute="" />);
        saveBtn = $(cmp.getDOMNode()).find('.modal-footer a:nth-child(2)')[0];
        var checkbox = $(cmp.refs.launchInWebtop.getDOMNode()).find('input[type=checkbox]')[0];

        TestUtils.Simulate.change(checkbox, {target: {checked: true}});
        TestUtils.Simulate.click(saveBtn);
        expect(updateLaunchPreferenceSpy.calledOnce).to.be.true();
        expect(updateLaunchPreferenceSpy.calledWith(true)).to.be.true();

        cmp = TestUtils.renderIntoDocument(<SettingsWindow backRoute="" />);
        saveBtn = $(cmp.getDOMNode()).find('.modal-footer a:nth-child(2)')[0];
        checkbox = $(cmp.refs.launchInWebtop.getDOMNode()).find('input[type=checkbox]')[0];

        //toggle twice, should go back to original state
        TestUtils.Simulate.click(checkbox);
        TestUtils.Simulate.click(checkbox);
        TestUtils.Simulate.click(saveBtn);

        //still only called once, since the checkbox is back in its original state no save is
        //necessary
        expect(updateLaunchPreferenceSpy.calledOnce).to.be.true();
    });
});
