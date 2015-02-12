'use strict';

var React = require('react');

var TabLaunchLink = React.createClass({
    propTypes: {
        listing: React.PropTypes.object.isRequired,
        newTab: React.PropTypes.bool
    },

    render: function() {
        var { listing, children, newTab, ...otherProps } = this.props;

        return (
            <a {...otherProps}
                    href={listing.launchUrl}
                    target={newTab ? '_blank' : '_self'}>
                {children}
            </a>
        );
    }
});

module.exports = TabLaunchLink;
