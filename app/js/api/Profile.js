'use strict';

var $ = require('jquery');
var Response = require('./responses/Response');

var { API_URL } = require('../OzoneConfig');

var ProfileApi = {
    getOwnedListings: function () {
        // TODO: De-hateosify this
        // Old url: ${API_URL}/api/profile/${encodeURIComponent(profileId)}/listing
        return $.getJSON(`${API_URL}/api/listing/FIXME`)
            .then(resp => [].concat((resp._embedded ? resp._embedded.item : null) || []));
    },

    getProfile: function () {
        return $.getJSON(`${API_URL}/api/self/profile/`);
    },

    updateProfile: function (profileData) {
        return $.ajax({
            url: `${API_URL}/api/self/profile/`,
            type: 'put',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(profileData)
        });
    },

    fetchNotifications: function () {
        return $.getJSON(API_URL + '/api/self/notification/').then(function (response) {
            return new Response(response, function (json) {
                json.expiresDate = new Date(json.expiresDate.replace('+0000', 'Z'));
                return json;
            });
        });
    },

    dismissNotification: function (notificationId) {
        return $.ajax({
            url: `${API_URL}/api/self/notification/${notificationId}`,
            type: 'delete'
        });
    }
};

module.exports = ProfileApi;
