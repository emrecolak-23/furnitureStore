const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'furniture-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'log/furniture/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'log/furniture/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/furniture/combined.log' }),
  ],
});

module.exports = logger
