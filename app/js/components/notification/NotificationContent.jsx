'use strict';
var React = require('react');
var Reflux = require('reflux');
var SelfActions = require('../../actions/ProfileActions.js');
var marked = require('marked');
var { CENTER_URL } = require('../../OzoneConfig');
var renderer = new marked.Renderer();

function getLink(listing, tabName) {
    if(listing && listing.id){
        var id = listing.id;

        var url = `${CENTER_URL}/#/home/?listing=${encodeURIComponent(id)}&action=view&tab=${encodeURIComponent(tabName)}`;
        return url;
    } else {
        return `${CENTER_URL}`;
    }
};

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
                { notification.notificationType !== "peer_bookmark" && notification.notificationType !== "restore_bookmark" &&
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
                { notification.notificationType === "restore_bookmark" &&
                    <div>
                    <p className="message small">{notification.peer.folderName?'The folder '+notification.peer.folderName :'A folder'} was recently deleted.</p>
                    <p className="message small">Click the button to restore it</p>
                    <div>
                        <button className="btn btn-success btn-sm" onClick={() => {
                            SelfActions.addBookmarkFolder(notification);
                        }}>Restore folder {notification.peer.folderName}</button>
                    </div>
                    </div>
                }
                {notification.notificationSubtype === 'listing_review' && notification.listing && <p class="small right"><a href={getLink(notification.listing, 'reviews')}>View reviews</a></p>}
                {notification.notificationSubtype === 'pending_deletion_cancellation' && <p class="small right"><a href={`${CENTER_URL}/#/user-management/my-listings`}>View my listings</a></p>}
                {notification.notificationSubtype === 'listing_new' && notification.listing && <p class="small right"><a href={getLink(notification.listing, 'administration')}>View submission</a></p>}
                {notification.notificationSubtype === 'review_request' && <p class="small right"><a href={`${CENTER_URL}/#/user-management/recent-activity`}>Go to Listing Management</a></p>}
                {notification.notificationType === 'subscription' && notification.listing && <p class="small right"><a href={getLink(notification.listing, 'overview')}>View listing</a></p>}
            </div>
        )
    }
});

module.exports= NotificationContent;
