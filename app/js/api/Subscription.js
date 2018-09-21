'use strict';

var $ = require('jquery');

var { API_URL } = require('../OzoneConfig');

var SubscriptionApi = {

    getSubscriptions: function() {
        return $.ajax({
            url: API_URL + '/api/self/subscription/'
        });
    },

    subscribeToEntity: function(type, entity_id) {
        return $.ajax({
            type: 'POST',
            url: API_URL + '/api/self/subscription/',
            data: JSON.stringify({entity_type: type, entity_id: entity_id}),
            contentType: 'application/json'
        });
    },

    unsubscribeToEntity: function(entity_id) {
        return $.ajax({
            type: 'DELETE',
            url: API_URL + '/api/self/subscription/' + entity_id + '/'
        });
    }
};

module.exports = SubscriptionApi;
