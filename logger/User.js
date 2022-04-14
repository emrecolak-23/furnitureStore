const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'log/user/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'log/user/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/user/combined.log' }),
  ],
});

module.exports = logger
