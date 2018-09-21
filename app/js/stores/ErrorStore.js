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
        this.data.hasErrors = true;

        this.trigger(this.data);
    }

});

module.exports = ErrorStore;
