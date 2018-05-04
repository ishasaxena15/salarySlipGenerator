var errors = require('./errors');
var winston = require('winston');

/**
 * Error handling middleware that responds with formatted error JSON.
 * @param {*} err - error.
 * @param {Object} req - express request.
 * @param {Object} res - express response.
 * @param {function(err)} next - express next.
 */
var errorHandler = function (err, req, res, next) {
    // log error
    winston.log('error', err);

    if (res.headersSent) {
        // response sending already started
        res.end();
        winston.log('warn', 'errorHandler: Request headers already sent. Cannot respond with error.');
    } else if (err instanceof errors.ApiError) {
        // api error
        err.sendTo(res);
    } else {
        // other error
        errors.internal_error().withDetails(inspectDetails(err)).sendTo(res);
    }

    // proceed
    next();
};
module.exports = errorHandler;
