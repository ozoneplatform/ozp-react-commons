'use strict';

var $ = require('jquery');
var { API_URL } = require('../OzoneConfig');

var ListingsApi = {
    fetchStatus: function (data) {
        return $.ajax({
            url: `${API_URL}/api/listings/essearch/`,
            type: 'get'
        });
    }

};

module.exports = ListingsApi;
