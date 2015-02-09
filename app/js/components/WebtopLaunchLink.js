'use strict';

var React = require('react');

var { WEBTOP_URL } = require('../OzoneConfig');

function getLink(listing) {
    var uuid = listing.uuid;

    return `${WEBTOP_URL}#/launchApp/${encodeURIComponent(uuid)}`;
}

/**
 * Encapsulation of "launch into webtop" logic.
 * For now that logic consists of a simple link
 */
var WebtopLaunchLink = React.createClass({
    propTypes: {
        listing: React.PropTypes.object.isRequired,
        newTab: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        className: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {newTab: false};
    },

    render: function() {
        /* jshint ignore:start */
        return (
            <a href={getLink(this.props.listing)}
                    className={this.props.className}
                    onClick={this.props.onClick}
                    target={this.props.newTab ? '_blank' : '_self'}>
                {this.props.children}
            </a>
        );
        /* jshint ignore:end */
    }
});

module.exports = WebtopLaunchLink;
