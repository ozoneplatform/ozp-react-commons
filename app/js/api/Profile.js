'use strict';

var $ = require('jquery');
var Response = require('./responses/Response');
var humps = require('humps');
var _ = require('../utils/_');

var { API_URL } = require('../OzoneConfig');

var ProfileApi = {

    // Isn't converted to Center format
    getOwnedListings: function () {
        return $.getJSON(`${API_URL}/api/self/listing/`).then(
            (resp) => humps.camelizeKeys(resp));
    },

    getProfile: function () {
        return $.getJSON(`${API_URL}/api/self/profile/`).then(
            (resp) => {
                resp = humps.camelizeKeys(resp);
                resp.username = resp.user.username;
                resp.email = resp.user.email;
                delete resp.user;
                resp.organizations = _.map(resp.organizations, 'shortName');
                resp.stewardedOrganizations = _.map(resp.stewardedOrganizations, 'shortName');
                return resp;
            });
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
            response = humps.camelizeKeys(response);
            return new Response(response, function (json) {
                json.expiresDate = new Date(json.expiresDate.replace('+0000', 'Z'));
                return json;
            });
        });
    },

    dismissNotification: function (notificationId) {
        return $.ajax({
            url: `${API_URL}/api/self/notification/${notificationId}/`,
            type: 'delete'
        });
    }
};

module.exports = ProfileApi;
