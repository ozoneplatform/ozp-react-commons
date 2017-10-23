'use strict';

var Reflux = require('reflux');
var createActions = require('../utils/createActions');
var SubscriptionApi = require('../api/Subscription');

var TagSubscriptionActions = Reflux.createActions([
    'fetchSubscriptions',
    'subscribeToTag',
    'unsubscribeToTag'
]);

module.exports = TagSubscriptionActions;
