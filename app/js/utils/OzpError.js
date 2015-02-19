'use strict';

/**
 * Constructor for simple objects which contain error information.
 * The three constructor arguments intentionally match up with the
 * arguments passed to jquery promise failure handlers for xhrs.
 * This function can be used with or without the `new` keyword
 *
 * Just like an actual Error object, this object supports the retrieval of its message via
 * a .message property.  The message will be the custom message from the response body, if any.
 */
function OzpError(xhr, jqErrorMessage, statusText) {
    var responseText = xhr.responseText,
        contentType = xhr.getResponseHeader('Content-Type'),
        isJson = contentType && contentType.indexOf('json') !== -1,
        responseJson = responseText && isJson ?
            JSON.parse(responseText) :
            null,
        jsonMessage = responseJson ? responseJson.message : null,


        //note: jqErrorMessage is generally just "error" so is not helpful here
        message = jsonMessage ||
            (contentType === 'text/plain' ? responseText : null) ||
            null;

    return Object.freeze({
        xhr: xhr,
        jqErrorMessage: jqErrorMessage,
        statusText: statusText,
        httpStatusCode: xhr.status || null,
        message: message
    });
}

module.exports = OzpError;
