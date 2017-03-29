'use strict';

var Reflux = require('reflux');
var createActions = require('../utils/createActions');
var ListingsApi = require('../api/Listings');

var ErrorActions = createActions({
    fetchEsStatus(data) {
        return ListingsApi.fetchStatus(data)
            .fail(ErrorActions.fetchEsStatusFailed);
    }

});

module.exports = ErrorActions;
