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

    addToLibrary: function (listing) {
        var libraryEntryJson = {
            listing: { id: listing.id }
        };

        return $.ajax({
            url: `${API_URL}/api/profile/self/library`,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(libraryEntryJson)
        });
    },

    removeFromLibrary: function (listing) {
        return $.ajax({
            url: `${API_URL}/api/profile/self/library/${encodeURIComponent(listing.id)}`,
            type: 'delete'
        });
    },

    getLibrary: function () {
        return $.getJSON(`${API_URL}/api/profile/self/library`);
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
