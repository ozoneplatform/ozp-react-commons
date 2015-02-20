'use strict';

var $ = require('jquery');
var Response = require('./responses/Response');

var { API_URL } = require('../OzoneConfig');

var ProfileApi = {
    getOwnedListings: function (profileId) {
        return $.getJSON(`${API_URL}/api/profile/${encodeURIComponent(profileId)}/listing`)
            .then(resp => [].concat((resp._embedded ? resp._embedded.item : null) || []));
    },

    getProfile: function (profileId) {
        return $.getJSON(`${API_URL}/api/profile/${encodeURIComponent(profileId)}`);
    },

    updateProfile: function (profileId, profileData) {
        return $.ajax({
            url: `${API_URL}/api/profile/${encodeURIComponent(profileId)}`,
            type: 'put',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(profileData)
        });
    },

    fetchNotifications: function () {
        return $.getJSON(API_URL + '/api/profile/self/notification').then(function (response) {
            return new Response(response, function (json) {
                json.expiresDate = new Date(json.expiresDate.replace('+0000', ''));
                return json;
            });
        });
    },

    dismissNotification: function (notificationId) {
        return $.ajax({
            url: `${API_URL}/api/profile/self/notification/${notificationId}`,
            type: 'delete'
        });
    }
};

module.exports = ProfileApi;
