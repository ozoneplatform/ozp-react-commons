'use strict';

var React = require('react');

var Time = React.createClass({
    propTypes: {
        date: React.PropTypes.instanceOf(Date).isRequired
    },

    mixins: [React.addons.PureRenderMixin],

    render() {
        var { date } = this.props;
        var time = date.toTimeString().replace(/:\d{2} GMT-\d{4}/, '').replace(/[(|)]/g, '');

        return (
            <span className="Time">{time}</span>
        );
    }
});

module.exports = Time;
