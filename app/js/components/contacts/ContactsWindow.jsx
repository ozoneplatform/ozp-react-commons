'use strict';

var React = require('react');
var Reflux = require('reflux');

var Modal = require('../Modal.jsx');

var { Navigation } = require('react-router');

var { HELP_URL,
      FEEDBACK_ADDRESS,
      HELPDESK_ADDRESS,
      REQUEST_ADDRESS,
      SOCIAL_CHIRP_ADDRESS,
      //SOCIAL_PIN_ADDRESS,
      SOCIAL_CHAT_ADDRESS,
      SOCIAL_BLOG_ADDRESS } = require('ozp-react-commons/OzoneConfig');

var ContactInfo = React.createClass({

    render: function () {
        return (
            <div className="contacts-info">
                <div className="row">
                    <div className="col-md-6">
                        <div className="col-md-3">
                            <i className="icon-question-60-grayLighter"/>
                        </div>
                        <div className="col-md-9">
                            <h3>Need Help?</h3>
                            <p>Check out our
                                <a href={HELP_URL} target={this.getTarget(HELP_URL)}> Help Center </a>
                                for tips and instructions on using the platform, or contact
                                 the help desk for dedicated support.
                            </p>
                            <a className="btn btn-primary btn-block" href={HELPDESK_ADDRESS} target={this.getTarget(HELPDESK_ADDRESS)}>Contact Help Desk</a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col-md-3">
                            <i className="icon-lightbulb-60-grayLighter"/>
                        </div>
                        <div className="col-md-9">
                            <h3>Request a Feature</h3>
                            <p>We want this platform to work better and smarter for you. Is there something we could add to make your workflow easier? Let us know.</p>
                            <a className="btn btn-primary btn-block" href={REQUEST_ADDRESS} target={this.getTarget(REQUEST_ADDRESS)}>Submit a Request</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="col-md-3">
                            <i className="icon-microphone-60-grayLighter"/>
                        </div>
                        <div className="col-md-9">
                            <h3>Have Feedback?</h3>
                            <p>The microphone is yours. We would love to hear your feedback! Email us any comments and critique.</p>
                            <a className="btn btn-primary btn-block" href={FEEDBACK_ADDRESS} target={this.getTarget(FEEDBACK_ADDRESS)}>Give Feedback</a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col-md-3">
                            <i className="icon-speech-bubble-60-grayLighter"/>
                        </div>
                        <div className="col-md-9">
                            <h3>Connect With Us</h3>
                            <p>Want to know the latest? Stay up to date with us through any of our social networks. We will keep you in the loop.</p>
                            <span className="btn-row">
                                <a className="btn btn-primary" href={SOCIAL_CHIRP_ADDRESS} target={this.getTarget(SOCIAL_CHIRP_ADDRESS)}>Chirp</a>
                                {/*<a className="btn btn-primary" href={SOCIAL_PIN_ADDRESS} target={this.getTarget(SOCIAL_PIN_ADDRESS)}>Pin</a>*/}
                                <a className="btn btn-primary" href={SOCIAL_CHAT_ADDRESS} target={this.getTarget(SOCIAL_CHAT_ADDRESS)}>Chat</a>
                                <a className="btn btn-primary" href={SOCIAL_BLOG_ADDRESS} target={this.getTarget(SOCIAL_BLOG_ADDRESS)}>Blog</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    getTarget: function ( address ) {
        var addressPrefix = address.substring(0,7);
        var target = (addressPrefix === "mailto:") ? "_self" : "_blank";
        return target;
    }
});

var ContactsWindow = React.createClass({
    mixins: [Navigation],

    propTypes: {
        //the route that should be set when the window is closed.
        //Can also be a function that changes the route
        //(this allows "goBack" to be used instead of an explicit route)
        backRoute: React.PropTypes.oneOfType([
            React.PropTypes.string.isRequired,
            React.PropTypes.func.isRequired
        ])
    },

    render: function() {
        return (
            <Modal modaltitle="Contact" ref="modal"
                    className="contacts-window" size="large"
                    onCancel={this.close}>
                <ContactInfo/>
            </Modal>
        );
    },

    close: function() {
        var backRoute = this.props.backRoute;

        if (typeof backRoute === 'function') {
            backRoute();
        }
        else {
            this.transitionTo(this.props.backRoute);
        }
    }
});

module.exports = ContactsWindow;
