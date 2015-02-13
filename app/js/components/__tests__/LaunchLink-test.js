'use strict';

var React = require('react');
var Reflux = require('reflux');
var TestUtils = React.addons.TestUtils;

var expect = require('chai').expect;
var sinon = require('sinon');

var StubComponent = React.createClass({
    render: () => <a/>
});

/* global describe, it */
describe('LaunchLink', function() {
    var mkProfile = launchInWebtop => ({currentUser: {launchInWebtop: launchInWebtop}}),
        launchLinkFactory = require('inject?./WebtopLaunchLink.jsx&./TabLaunchLink.jsx&../stores/SelfStore!../LaunchLink.jsx');


    it('gets its launchInWebtop state from the SelfStore', function() {
        var mockStore = Reflux.createStore({
            getDefaultData: mkProfile.bind(null, false)
        });

        var LaunchLink = launchLinkFactory({
            './WebtopLaunchLink.jsx': StubComponent,
            './TabLaunchLink.jsx': StubComponent,
            '../stores/SelfStore': mockStore
        });

        var cmp = TestUtils.renderIntoDocument(<LaunchLink listing={{}} />);

        expect(cmp.state.launchInWebtop).to.be.false();

        mockStore.trigger(mkProfile(true));
        expect(cmp.state.launchInWebtop).to.be.true();

        mockStore.trigger(mkProfile(false));
        expect(cmp.state.launchInWebtop).to.be.false();
    });

    it('renders WebtopLaunchLink or TabLaunchLink depending on the launchInWebtop', function() {
        var mockStore = Reflux.createStore({
                getDefaultData: mkProfile.bind(null, false)
            }),
            webtopLaunchLinkRenderSpy = sinon.spy(() => null),
            tabLaunchLinkRenderSpy = sinon.spy(() => null),
            WebtopLaunchLink = React.createClass({render: webtopLaunchLinkRenderSpy}),
            TabLaunchLink = React.createClass({render: tabLaunchLinkRenderSpy});

        var LaunchLink = launchLinkFactory({
            './WebtopLaunchLink.jsx': WebtopLaunchLink,
            './TabLaunchLink.jsx': TabLaunchLink,
            '../stores/SelfStore': mockStore
        });

        TestUtils.renderIntoDocument(<LaunchLink listing={{}} />);

        expect(tabLaunchLinkRenderSpy.calledOnce).to.be.true();
        expect(webtopLaunchLinkRenderSpy.called).to.be.false();

        webtopLaunchLinkRenderSpy.reset();
        tabLaunchLinkRenderSpy.reset();
        mockStore.trigger(mkProfile(true));

        expect(tabLaunchLinkRenderSpy.called).to.be.false();
        expect(webtopLaunchLinkRenderSpy.calledOnce).to.be.true();
    });

    it('passes newTab = true to WebtopLaunchLink iff its newTab is true or {webtop:true}',
            function() {
        var mockStore = Reflux.createStore({
                getDefaultData: mkProfile.bind(null, true)
            });

        var LaunchLink = launchLinkFactory({
            './WebtopLaunchLink.jsx': StubComponent,
            './TabLaunchLink.jsx': StubComponent,
            '../stores/SelfStore': mockStore
        });

        var cmp = TestUtils.renderIntoDocument(<LaunchLink listing={{}} newTab={true}/>),
            webtopLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);
        expect(webtopLaunchLink.props.newTab).to.be.true();

        cmp = TestUtils.renderIntoDocument(<LaunchLink listing={{}} newTab={false}/>);
        webtopLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);
        expect(webtopLaunchLink.props.newTab).to.be.false();

        cmp = TestUtils.renderIntoDocument(<LaunchLink listing={{}}
                newTab={{webtop:true, tab: false}}/>);
        webtopLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);
        expect(webtopLaunchLink.props.newTab).to.be.true();

        cmp = TestUtils.renderIntoDocument(<LaunchLink listing={{}}
                newTab={{webtop:false, tab: true}}/>);
        webtopLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);
        expect(webtopLaunchLink.props.newTab).to.be.false();
    });

    it('passes newTab = true to TabLaunchLink iff its newTab is true or {tab:true}',
            function() {
        var mockStore = Reflux.createStore({
                getDefaultData: mkProfile.bind(null, false)
            });

        var LaunchLink = launchLinkFactory({
            './WebtopLaunchLink.jsx': StubComponent,
            './TabLaunchLink.jsx': StubComponent,
            '../stores/SelfStore': mockStore
        });

        var cmp = TestUtils.renderIntoDocument(<LaunchLink listing={{}} newTab={true}/>),
            tabLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);
        expect(tabLaunchLink.props.newTab).to.be.true();

        cmp = TestUtils.renderIntoDocument(<LaunchLink listing={{}} newTab={false}/>);
        tabLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);
        expect(tabLaunchLink.props.newTab).to.be.false();

        cmp = TestUtils.renderIntoDocument(<LaunchLink listing={{}}
                newTab={{webtop:true, tab: false}}/>);
        tabLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);
        expect(tabLaunchLink.props.newTab).to.be.false();

        cmp = TestUtils.renderIntoDocument(<LaunchLink listing={{}}
                newTab={{webtop:false, tab: true}}/>);
        tabLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);
        expect(tabLaunchLink.props.newTab).to.be.true();
    });

    it('passes all additional props down to the child component', function() {
        var mockStore = Reflux.createStore({
                getDefaultData: mkProfile.bind(null, false)
            });

        var LaunchLink = launchLinkFactory({
            './WebtopLaunchLink.jsx': StubComponent,
            './TabLaunchLink.jsx': StubComponent,
            '../stores/SelfStore': mockStore
        });

        var listing = {};

        var cmp = TestUtils.renderIntoDocument(
                <LaunchLink listing={listing} data-test="test" draggable="true"
                    className="test-class" newTab={true}/>
            ),
            tabLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);

        expect(tabLaunchLink.props.draggable).to.equal('true');
        expect(tabLaunchLink.props['data-test']).to.equal('test');
        expect(tabLaunchLink.props.className).to.equal('test-class');

        mockStore.trigger(mkProfile(true));


        var webtopLaunchLink = TestUtils.findRenderedComponentWithType(cmp, StubComponent);

        expect(webtopLaunchLink.props.draggable).to.equal('true');
        expect(webtopLaunchLink.props['data-test']).to.equal('test');
        expect(webtopLaunchLink.props.className).to.equal('test-class');
    });
});
