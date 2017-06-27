'use strict';

var React = require('react');

var _Date = React.createClass({

    propTypes: {
        date: React.PropTypes.instanceOf(Date).isRequired
    },

    mixins: [React.addons.PureRenderMixin],

    render() {
        var { date } = this.props;
        var day = date.getUTCDate();
        var month = date.getUTCMonth() + 1;
        var year = date.getUTCFullYear();

        return (
            <span className="Date">{`${month}/${day}/${year}`}</span>
        );
    }
});

module.exports = _Date;
