'use strict';

var React = require('react');

var Time = React.createClass({
    propTypes: {
        date: React.PropTypes.instanceOf(Date).isRequired
    },

    mixins: [React.addons.PureRenderMixin],

    formatZero(num) {
        if (num < 10) {
            num = "0" + num;
        }
        return num;
    },

    render() {
        var { date } = this.props;
        var time = this.formatZero(date.getUTCHours()) + '' + this.formatZero(date.getUTCMinutes()) + ' Z';

        return (
            <span className="Time">{time}</span>
        );
    }
});

module.exports = Time;
