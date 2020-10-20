const winston = require('winston');

module.exports = ({ config }) => {

    const winstonOptions = {
        levels: winston.config.syslog.levels,
        format: winston.format.json(),
        defaultMeta: { service: config.serviceName },
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.colorize(),
                    winston.format.printf(msg => {
                        const message = typeof msg.message === 'object' ? JSON.stringify(msg.message) : msg.message || msg[Symbol.for('message')];
                        return `${msg.timestamp} / ${config.serviceName} / ${msg.level}: ${message}`;
                    }))
            })
        ]
    };

    const logger = winston.createLogger(winstonOptions);
    return logger;
};