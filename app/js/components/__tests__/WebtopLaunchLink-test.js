'use strict';

var React = require('react');
var TestUtils = React.addons.TestUtils;

var expect = require('chai').expect;

/* global describe, it */
describe('WebtopLaunchLink', function() {
    var webtopLaunchLinkFactory = require('inject?../OzoneConfig!../WebtopLaunchLink.jsx'),
        WebtopLaunchLink = webtopLaunchLinkFactory({
            '../OzoneConfig': {
                WEBTOP_URL: 'https://widgethome/webtop'
            }
        });

    it('renders an anchor with the appropriate children', function() {
        var url = 'https://widgethome/widget',
            listing = {
                launch_url: url
            };

        var cmp = TestUtils.renderIntoDocument(
                <WebtopLaunchLink listing={listing}>
                    Test child <small>text</small>
                </WebtopLaunchLink>
            );

        expect(cmp.getDOMNode().innerText).to.equal('Test child text');
    });

    it('constructs a webtop launch URL as the href', function() {
        var unique_name = 'de305d54-75b4-431b-adb2-eb6b9e546013',
            listing = {
                unique_name: unique_name
            };

        var cmp = TestUtils.renderIntoDocument(
                <WebtopLaunchLink listing={listing}>
                    Test child <small>text</small>
                </WebtopLaunchLink>
            );

        expect(cmp.getDOMNode().getAttribute('href')).to
            .equal('https://widgethome/webtop/#/launchApp/de305d54-75b4-431b-adb2-eb6b9e546013');
    });

    it('sets target to _blank or _self depending on the newTab prop', function() {
        var url = 'https://widgethome/widget',
            listing = {
                launchUrl: url
            };

        var cmp = TestUtils.renderIntoDocument(
                <WebtopLaunchLink listing={listing} newTab={false}>
                    Test child <small>text</small>
                </WebtopLaunchLink>
            );

        expect(cmp.getDOMNode().getAttribute('target')).to.equal('_self');

        cmp = TestUtils.renderIntoDocument(
                <WebtopLaunchLink listing={listing} newTab={true}>
                    Test child <small>text</small>
                </WebtopLaunchLink>
            );
        expect(cmp.getDOMNode().getAttribute('target')).to.equal('_blank');
    });

    it('applies other properties directly to the anchor tag', function() {
        var url = 'https://widgethome/widget',
            listing = {
                launchUrl: url
            };

        var cmp = TestUtils.renderIntoDocument(
                <WebtopLaunchLink listing={listing} newTab={false}
                        className="test-class" draggable="false" data-test="test">
                    Test child <small>text</small>
                </WebtopLaunchLink>
            );

        expect(cmp.getDOMNode().classList.length).to.equal(1);
        expect(cmp.getDOMNode().classList[0]).to.equal('test-class');

        expect(cmp.getDOMNode().getAttribute('draggable')).to.equal('false');
        expect(cmp.getDOMNode().getAttribute('data-test')).to.equal('test');

        expect(cmp.getDOMNode().getAttribute('listing')).to.not.be.ok();
        expect(cmp.getDOMNode().getAttribute('newTab')).to.not.be.ok();
    });
});
