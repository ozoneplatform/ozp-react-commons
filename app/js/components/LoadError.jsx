'use strict';

var React = require('react');

var messagesForError = require('../utils/ErrorMessages');

var LoadError = React.createClass({
    propTypes: {
        error: React.PropTypes.object.isRequired
    },

    render: function() {
        var errorMessages = messagesForError(this.props.error);

        return (
            <section className="load-error">
                <p>There was a problem completing your request.</p>
                <div className="error-details">
                    <h4>{errorMessages.shortDescription}</h4>
                    <p><label>Error code</label> {errorMessages.code || "None"}</p>
                    <p>{errorMessages.longDescription}</p>
                    <p><label>Server Message</label> {errorMessages.serverMessage || "None"}</p>
                    <section className="recommended-action">
                        <h5>What should I do?</h5>
                        <p>{errorMessages.recommendedAction}</p>
                    </section>
                </div>
            </section>
        );
    }
});

module.exports = LoadError;
