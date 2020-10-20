/* eslint-disable no-unused-vars */

module.exports = ({ container }) => (err, req, res, next) => {
    const { logger, config, httpConstants } = container.cradle;

    logger.error(err);

    const options =
        config.stackError && config.stackError.isVisible
            ? { stack: err.stack }
            : '';

    const statusCode = err.statusCode || httpConstants.code.INTERNAL_SERVER_ERROR;
    const errorCode = err.errorCode || 'no_message';

    const errorCustom = {
        message: err.message || httpConstants.message.INTERNAL_SERVER_ERROR,
        status_code: statusCode,
        error_code: errorCode,
        details: err.details || []
    };
    return res.status(statusCode).json(Object.assign(errorCustom, options));
};