'use strict';

var React = require('react');

window.React = React;
window.$ = window.jQuery = require('jquery');

//initialize bootstrap jquery plugins
require('bootstrap');

//require all tests
//This snippet was pulled from the karma-webpack README
var testsContext = require.context('..', true, /-test$/);
testsContext.keys().forEach(testsContext);
