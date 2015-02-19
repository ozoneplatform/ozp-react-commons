'use strict';

var f = Object.freeze;

/* jshint multistr:true */
var messages = f({
    400: f({
        shortDescription: "Bad Request",
        longDescription: "The application sent the server a poorly worded request and the server \
            cannot understand what was requested.",
        recommendedAction: "Please contact your system administrator."
    }),
    401: f({
        shortDescription: "Unauthorized",
        longDescription: "The request requires an authenticated, authorized user and \
            authorization has been refused.",
        recommendedAction: "Check that you have the appropriate credentials available for \
            authentication and authorization and try again. If you feel that you have reached \
            this page in error, please contact your system administrator."
    }),
    403: f({
        shortDescription: "Forbidden",
        longDescription: "You do not have the correct role for the server to complete \
            this request.",
        recommendedAction: "Check that you have the appropriate credentials available for \
            authentication and authorization and try again. If you feel that you have reached \
            this page in error, please contact your system administrator."
    }),
    404: f({
        shortDescription: "Not Found",
        longDescription: "The requested item was not found at the specified location. The address \
            may be incorrect or it may have moved or been deleted.",
        recommendedAction: "Please contact your system administrator."
    }),
    405: f({
        shortDescription: "Method Not Allowed",
        longDescription: "The method identified in the system's request is not valid for the \
            resource referred to.",
        recommendedAction: "Please contact your system administrator."
    }),
    406: f({
        shortDescription: "Not Acceptable",
        longDescription: "The resource identified in the system's request is not able to provide \
            an acceptable response.",
        recommendedAction: "Please contact your system administrator."
    }),
    407: f({
        shortDescription: "Proxy Authentication Required",
        longDescription: "The request requires an authenticated, authorized user and \
            authorization has been refused. You must be authorized via the proxy authentication \
            service.",
        recommendedAction: "Check that you have the appropriate credentials available for \
            authentication and authorization and try again. If you feel that you have reached \
            this page in error, please contact your system administrator."
    }),
    408: f({
        shortDescription: "Request Timeout",
        longDescription: "The response was not provided to the server in time.",
        recommendedAction: "Please try again. If you receive this message multiple times, contact \
            your system administrator."
    }),
    409: f({
        shortDescription: "Conflict",
        longDescription: "The request could not be completed due to a conflict with the current \
            state of the resource.",
        recommendedAction: "Please check any selections or uploads and try again. If you receive \
            this message multiple times, please contact your system administrator."
    }),
    410: f({
        shortDescription: "Gone",
        longDescription: "The requested item was moved.",
        recommendedAction: "Please contact your system administrator."
    }),
    411: f({
        shortDescription: "Length Required",
        longDescription: "The server could not accept the request without a specific length for \
            the content.",
        recommendedAction: "Please contact your system administrator."
    }),
    412: f({
        shortDescription: "Precondition Failed",
        longDescription: "The server could not fulfill the request because a precondition in a \
            request-header field was false when tested by the server.",
        recommendedAction: "Please contact your system administrator."
    }),
    413: f({
        shortDescription: "Request Entity Too Large",
        longDescription: "The server could not fulfill the request because the request entity is \
            larger than the server can process.",
        recommendedAction: "Please contact your system administrator."
    }),
    414: f({
        shortDescription: "Request - URI Too Long",
        longDescription: "The URI for the request is too long for the server to interpret.",
        recommendedAction: "Please contact your system administrator."
    }),
    415: f({
        shortDescription: "Unsupported Media Type",
        longDescription: "The server could not fulfill the request because the entity of the \
            request is in an unsupported format.",
        recommendedAction: "Please contact your system administrator."
    }),
    416: f({
        shortDescription: "Requested Range Not Satisfiable",
        longDescription: "The range of values specified in the request cannot be satisfied by the \
            server.",
        recommendedAction: "Please contact your system administrator."
    }),
    417: f({
        shortDescription: "Expectation Failed",
        longDescription: "The expectation given in an Expect request-header field could not be \
            met by this server or, if using a proxy, the request could not be met by the next \
            hop-server.",
        recommendedAction: "Please contact your system administrator."
    }),
    500: f({
        shortDescription: "Internal Server Error",
        longDescription: "The server encountered an unexpected issue that prevented it from \
            fulfilling your request.",
        recommendedAction: "Please try again. If you receive this message multiple times, please \
            contact your system administrator."
    }),
    501: f({
        shortDescription: "Not Implemented",
        longDescription: "The server does not currently support the functionality required to \
            fulfill your request.",
        recommendedAction: "Please contact your system administrator."
    }),
    502: f({
        shortDescription: "Bad Gateway",
        longDescription: "The server received an invalid response from another server which it \
            contacted in order to complete your request.",
        recommendedAction: "Please try again. If you receive this message multiple times, please \
            contact your system administrator."
    }),
    503: f({
        shortDescription: "Service Unavailable",
        longDescription: "The server is currently unable to handle your request because it is \
            temporary overloaded or down for maintenance.",
        recommendedAction: "Please wait a few minutes and try again. If you receive this message \
            multiple times,please contact your system administrator."
    }),
    504: f({
        shortDescription: "Gateway Timeout",
        longDescription: "The server did not receive a timely response from another server and \
            could not complete your request.",
        recommendedAction: "Please try again. If you receive this message multiple times, contact \
            your system administrator."
    }),
    505: f({
        shortDescription: "HTTP Version Not Supported",
        longDescription: "A request sent by the application is in an HTTP version that is not \
            supported by the server.",
        recommendedAction: "Please contact your system administrator."
    })
});

var unknownErrorMessage = f({
    shortDescription: "Unknown Error",
    longDescription: "An unknown issue occurred and prevented the server from fulfilling the \
        request.",
    recommendedAction: "Please try again. If you receive this message multiple times, please \
        contact your system administrator."
});

function messagesForError(err) {
    var { httpStatusCode, message } = err,
        cannedMessages = httpStatusCode ? messages[httpStatusCode] : unknownErrorMessage;

    return Object.assign({serverMessage: message, code: httpStatusCode}, cannedMessages);
}

module.exports = messagesForError;
