'use strict';
var React = require('react');
var Reflux = require('reflux');
var SelfActions = require('../../actions/ProfileActions.js');
var marked = require('marked');
var renderer = new marked.Renderer();

var NotificationContent = React.createClass({
    propTypes: {notification: React.PropTypes.object.isRequired},
    render: function() {
        var notification = this.props.notification;
        if (!notification)
            return (<div></div>);
        var createNotificationText = function() {
            return {__html: marked(notification.message, { renderer: renderer })};
          };
        return (
            <div>
                { notification.notificationType !== "peer_bookmark" &&
                <span className="message small" dangerouslySetInnerHTML={createNotificationText()}></span>
                }
                { notification.notificationType === "peer_bookmark" &&
                    <div>
                    <p className="message small">{notification.author.user.username} has shared {notification.peer.folderName?'the folder '+notification.peer.folderName :'a folder'} with you.</p>
                    {notification.message && <p className="message small">Message: {notification.message}</p>}
                    <div>
                        <button className="btn btn-success btn-sm" onClick={() => {
                            SelfActions.addBookmarkFolder(notification);
                        }}>Add folder {notification.peer.folderName}</button>
                    </div>
                    </div>
                }
            </div>
        )
    }
});

module.exports= NotificationContent;