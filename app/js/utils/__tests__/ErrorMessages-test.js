'use strict';

var expect = require('chai').expect;

var messagesForError = require('../ErrorMessages');

/* global describe, it */
describe('ErrorMessages', function() {
    it('returns messages for the HTTP response code in the error', function() {
        var error = { httpStatusCode: 404 },
            messages = messagesForError(error);

        expect(messages.shortDescription).to.be.ok();
        expect(messages.longDescription).to.be.ok();
        expect(messages.recommendedAction).to.be.ok();
        expect(messages.code).to.equal(404);
    });

    it('returns the `message` from the error as `serverMessage`', function() {
        var message = 'test message',
            error = { message: message },
            messages = messagesForError(error);

        expect(messages.serverMessage).to.equal(message);
    });

    it('uses unknown error messages if there is no httpStatusCode', function() {
        var message = 'test message',
            error = { message: message },
            messages = messagesForError(error);

        expect(messages.shortDescription).to.equal('Unknown Error');
    });

    it('returns exception message as `serverMessage`', function() {
        var message = 'test message',
            error = new Error(message),
            messages = messagesForError(error);

        expect(messages.shortDescription).to.equal('Unknown Error');
        expect(messages.serverMessage).to.equal(message);
    });
});
