'use strict';

var React = require('react');
var Reflux = require('reflux');

var Modal = require('../Modal.jsx');

var { API_URL } = require('../../OzoneConfig');

var ErrorWindow = React.createClass({
    propTypes: {
        errorMessage: React.PropTypes.string
    },

    render: function() {
        return (
            <Modal modaltitle="Error" ref="modal"
            className="error-window"
            onCancel={this.close}>
                <div>{this.props.errorMessage}</div>
            </Modal>
        );
    }

});

module.exports = ErrorWindow;
