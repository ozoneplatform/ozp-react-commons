'use strict';

var $ = require('jquery');

var { API_URL } = require('../OzoneConfig');

var ProfileApi = {
    getOwnedListings: function (profileId) {
        return $.getJSON(`${API_URL}/api/profile/${encodeURIComponent(profileId)}/listing`)
            .then(resp => [].concat((resp._embedded ? resp._embedded.item : null) || []));
    },

    getProfile: function (profileId) {
        return $.getJSON(`${API_URL}/api/profile/${encodeURIComponent(profileId)}`);
    },

    updateProfile: function(profileId, profileData) {
        return $.ajax({
            url: `${API_URL}/api/profile/${encodeURIComponent(profileId)}`,
            type: 'put',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(profileData)
        });
    }
};

module.exports = ProfileApi;
