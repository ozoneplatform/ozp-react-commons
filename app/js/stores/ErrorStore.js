'use strict';

var React = require('react');
var Reflux = require('reflux');
var $ = require('jquery');

var ListingsApi = require('../api/Listings');
var ErrorActions = require('../actions/ErrorActions');

var ErrorStore = Reflux.createStore({
    listenables: ErrorActions,
    data: {},

    onFetchEsStatusFailed: function (payload) {
        if (payload.status == 503) {
            this.data.hasErrors = true;
            this.data.errorMessage = "Search is currently unavailable. Please try again in a few minutes.";
        }

        this.trigger(this.data);
    }

});

module.exports = ErrorStore;
