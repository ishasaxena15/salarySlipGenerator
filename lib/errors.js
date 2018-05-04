var _ = require('lodash');
var _ = require('lodash');
var util = require('util');
var errStackParser = require('error-stack-parser');

var errors = {};
module.exports = errors;

/**
 * Adds useful methods to errors. Use this to create new type of errors.
 * @param {Number} httpCode - HTTP response code.
 * @param {Number} errorCode - error code.
 * @param {String} description - error description.
 * @param {*} stackFrames - error stack frames.
 */
function ApiError(httpCode, errorCode, description, stackFrames) {
    this.httpCode = httpCode;
    this.errorCode = errorCode;
    this.description = description;
    this.details = null;
    this.stackFrames = stackFrames;
}
util.inherits(ApiError, Error);

// expose constructor
errors.ApiError = ApiError;

/**
 * sets arbitrary details object to error.
 * @param {Object} detail - detail object.
 * @return error.
 */
ApiError.prototype.withDetails = function (details) {
    this.details = details;
    return this;
};


/**
 * sends error as JSON via express response. Sets appropriate HTTP status as well.
 * @param {Object} response - express response.
 */
ApiError.prototype.sendTo = function (response) {
    response.status(this.httpCode);
    response.json({ errorCode: this.errorCode, description: this.description, details: this.details });
};

/**
 * Genreates a function to create ApiError when called.
 * @param {Number} httpCode - HTTP response code.
 * @param {Number} errorCode - error code.
 * @param {String} description - error description.
 */
function create(httpCode, errorCode, description) {
    return function () {
        // create error stack frames (drop the first one for this function call)
        var stackFrames = _.drop(errStackParser.parse(new Error(errorCode)), 1);

        // filter out node's internal and node_module file links
        stackFrames = stackFrames.filter(function (sf) {
            return _.startsWith(sf.fileName, '/') && sf.fileName.indexOf('node_modules') < 0;
        });

        // return a new error instance, with error stack trace
        return new ApiError(httpCode, errorCode, description, stackFrames);
    };
}

//--------------------- GENERIC ERRORS -------------------------/

errors.internal_error = create(500, 'INTERNAL_ERROR',
    'Something went wrong on server. Please contact server admin.');


errors.invalid_input = create(400, 'INVALID_INPUT',
    'The request input is not as expected by API. Please provide valid input.');


//--------------------- BUSINESS LOGIC ERRORS ---------------------------/

errors.invalid_login = create(400, 'INVALID_LOGIN',
    'Login credentials do not match any registered user.');

