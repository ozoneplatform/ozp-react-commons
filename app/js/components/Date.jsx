'use strict';

var React = require('react');

var _Date = React.createClass({

    propTypes: {
        date: React.PropTypes.instanceOf(Date).isRequired
    },

    mixins: [React.addons.PureRenderMixin],

    render() {
        var { date } = this.props;
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return (
            <span className="Date">{`${month}/${day}/${year}`}</span>
        );
    }
});

module.exports = _Date;
