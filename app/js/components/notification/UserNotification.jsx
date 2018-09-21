'use strict';

var React = require('react');
var { PropTypes } = React;
var _Date = require('../Date.jsx');
var Time = require('../Time.jsx');
var $ = require('jquery');
var { API_URL } = require('../../OzoneConfig');
var CenterModalLink = require('../CenterModalLink.jsx');
var NotificationContent = require('./NotificationContent.jsx');

var SelfActions = require('../../actions/ProfileActions.js');
var marked = require('marked');
var renderer = new marked.Renderer();

// Disable heading tags
renderer.heading = function (text, level) {
  return '<span>' + text + '</span>';
};

renderer.link = function (href, title, text) {
  return `<a href="${href}" target="_blank">${text}</a>`;
};

renderer.code = function (code, language) {
  return `<span>${code}</span>`;
};

renderer.blockquote = function (quote) {
  return `<span>${quote}</span>`;
};

renderer.br = function () {
  return `<span></span>`;
};

renderer.image = function () {
  return `<span></span>`;
};

var UserNotification = React.createClass({

    propTypes: {
        notification: PropTypes.object.isRequired
    },

    onDismiss(event) {
        this.props.openDropdown();
        event.preventDefault();
        event.stopPropagation();
        SelfActions.dismissNotification(this.props.notification);
    },

    convertDateFromISO(s) {
      s = s.split(/\D/);
      return new Date(Date.UTC(s[0], --s[1]||'', s[2]||'', s[3]||'', s[4]||'', s[5]||'', s[6]||''))
    },

    render() {
        var { createdDate, message, listing } = this.props.notification;
        createdDate = this.convertDateFromISO(createdDate);
        const choppedMessage = (message.length > 150) ? () => {
          return `${message.slice(0, 150)}...`;
        } : () => {
          return message;
        };

        let createNotificationText = function() {
          return {__html: marked(choppedMessage(), { renderer: renderer })};
        };

        let listingLink = null;
        if(listing)
          listingLink = <CenterModalLink listing={listing}>{listing.title}</CenterModalLink>;
        else
          listingLink = 'AppsMall';

        return (
            <li className={(this.props.notification.readStatus === false ? 'unread ': '') + "UserNotification clearfix"} 
            onClick={() => { this.props.openDropdown(); SelfActions.readNotification(this.props.notification)}}>
                <button type="button" className="close pull-right" onClick={this.onDismiss}><i className="icon-cross-16"></i></button>
                <h5 className="created-by">
                  {listingLink}
                </h5>
                <div className="created-at">
                    <_Date date={createdDate} />
                    <Time date={createdDate} />
                </div>
                <NotificationContent notification={this.props.notification} />
            </li>
        );
    }

});

module.exports = UserNotification;
