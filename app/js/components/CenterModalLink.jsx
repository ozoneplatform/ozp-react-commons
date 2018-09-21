'use strict';

var React = require('react');

var { CENTER_URL } = require('../OzoneConfig');

function getLink(listing, tabName) {
    var id = listing.id;

    var url = `${CENTER_URL}/#/home/?listing=${encodeURIComponent(id)}&action=view&tab=${encodeURIComponent(tabName)}`;
    return url;
};

/**
 * Encapsulation of "listing modal open" logic.
 */
var CenterModalLink = React.createClass({
    propTypes: {
        listing: React.PropTypes.object.isRequired,
        tabName: React.PropTypes.string,
        onClick: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {tabName: 'overview'};
    },

    render: function() {
        var { tabName, listing, children, ...otherProps } = this.props;

        return (
            <a href={getLink(listing, tabName)}
                    {...otherProps}>
                {children}
            </a>
        );
    }
});

module.exports = CenterModalLink;
