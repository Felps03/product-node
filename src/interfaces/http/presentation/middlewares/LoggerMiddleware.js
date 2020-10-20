const morgan = require('morgan');
const LoggerStreamAdapter = require('src/interfaces/http/presentation/middlewares/logging/LoggerStreamAdapter');

module.exports = ({ logger }) => {
    return morgan('dev', {
        stream: LoggerStreamAdapter.toStream(logger)
    });
};
