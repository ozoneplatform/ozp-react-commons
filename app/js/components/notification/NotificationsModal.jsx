'use strict';

var React = require('react');
var Reflux = require('reflux');

var Modal = require('../Modal.jsx');

var { Navigation } = require('react-router');

var SelfStore = require('../../stores/SelfStore');
var SelfActions = require('../../actions/ProfileActions.js');
var NotificationContent = require ('./NotificationContent.jsx');
var { API_URL } = require('../../OzoneConfig');

 var marked = require('marked');
 var renderer = new marked.Renderer();

var NotificationsModal = React.createClass({
    mixins: [Navigation],
    
    propTypes: {
        backRoute: React.PropTypes.oneOfType([
            React.PropTypes.string.isRequired,
            React.PropTypes.func.isRequired
        ])
    },
    
    render: function() { 
        return (
            <Modal modaltitle="Notifications" ref="modal"
            className="notification-window"
             onHidden={this.props.onHidden} onCancel={this.close}>
                <NotificationInfo />
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

var NotificationInfo = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState: function() {
        return {
            activeNotificationIndex: 0,
            notificationList: []       
        }
    },
    componentWillMount: function() {
        this.listenTo(SelfActions.fetchNotificationsCompleted, response => {
            this.setState({
                notificationList: response._response
            });
        });
        this.listenTo(SelfActions.dismissNotificationCompleted, () => {
            SelfActions.fetchNotifications();
        })

        SelfActions.fetchNotifications();
    },
    render: function() {
        return (
            <div className="row">
            <NotificationSideBar activeNotificationIndex={this.state.activeNotificationIndex}
            notificationList={this.state.notificationList} 
            handleNotificationChange={this.handleNotificationChange}/>
            <div className="col-xs-8">
            { this.state.notificationList.length > 0 &&
                <Notification notification={this.state.notificationList[this.state.activeNotificationIndex]} />
            }

            { !this.state.notificationList.length &&
                <span>No notifications</span>
            }
            </div>
        </div>
      );
    },
    handleNotificationChange: function(event, index) {
        this.setState({activeNotificationIndex: index})
    }
});

var Notification = React.createClass({
    propTypes: {
        notification: React.PropTypes.object
    },
    
    render: function() { 
        var notification = this.props.notification;
        if(!this.props.notification)
            return <div></div>
        var createNotificationText = function() {
            return {__html: marked(notification.message, { renderer: renderer })};
          };
          var date = new Date(notification.createdDate);
          var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
          var formattedDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' +  date.getFullYear();
          return (
            <div>
              <div className="row" tabIndex={0}>
                <h4>{(notification.listing) ? notification.listing.title : 'AppsMall'} <small>{formattedDate}</small></h4>
                <div>
    
                  <NotificationContent notification={notification} />
                  <br /><br />
                  <button className="btn btn-danger right" aria-label={`Remove notification from ${(notification.listing) ? notification.listing.title : 'AppsMall'}`} onClick={() => {
                      this.onDismiss(notification);
                    }}>
                    Remove Notification
                  </button>
                </div>
              </div>
            </div>
          );
    },
    onDismiss: function(notification){
        SelfActions.dismissNotification(notification);
    }
});

var NotificationSideBar = React.createClass({
    propTypes: {
        notificationList: React.PropTypes.array.isRequired,
        activeNotificationIndex: React.PropTypes.number.isRequired,
        handleNotificationChange: React.PropTypes.func.isRequired
    },
    render: function() {
        var notis = this.props.notificationList.slice(0);
        
        return ( 
            <div className="col-xs-4">
            <ul className="nav nav-pills nav-inverse nav-stacked">
            {notis.map((n, i) => {
            var date = new Date(n.createdDate);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            var formattedDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' +  date.getFullYear();
            return (
                <li role="presentation" alt={`Notification ${i + 1} from ${(n.listing) ? n.listing.title : 'AppsMall'}`} tabIndex={i} 
                onClick={(event) => {this.props.handleNotificationChange(event, i)}}>
                <a href="#" onClick={(e) => {e.preventDefault()}} className={i===this.props.activeNotificationIndex?'notification-selected':''}>
                    {(n.listing) ? n.listing.title : 'AppsMall'} <small>{formattedDate}</small>
                </a>
                </li>
            );
            })}
            </ul>
            </div>
        );
    }
})

module.exports = NotificationsModal;
