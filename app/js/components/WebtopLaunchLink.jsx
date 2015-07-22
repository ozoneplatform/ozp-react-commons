'use strict';

var React = require('react');

var { WEBTOP_URL } = require('../OzoneConfig');

function getLink(listing) {
    var unique_name = listing.unique_name;

    return `${WEBTOP_URL}#/launchApp/${encodeURIComponent(unique_name)}`;
}

/**
 * Encapsulation of "launch into webtop" logic.
 * For now that logic consists of a simple link
 */
var WebtopLaunchLink = React.createClass({
    propTypes: {
        listing: React.PropTypes.object.isRequired,
        newTab: React.PropTypes.bool,
        onClick: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {newTab: false};
    },

    render: function() {
        var { newTab, listing, children, ...otherProps } = this.props;

        return (
            <a href={getLink(listing)}
                    target={newTab ? '_blank' : '_self'}
                    {...otherProps}>
                {children}
            </a>
        );
    }
});

module.exports = WebtopLaunchLink;
