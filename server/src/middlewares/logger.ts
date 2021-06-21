import winston from 'winston';
import expressWinston from 'express-winston';

const logFormatMaker = (verbose = false) => winston.format.combine(
  winston.format.prettyPrint(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.printf(({
    timestamp, level, message, ...metadata
  }) => {
    let msg = `${timestamp} [${level}]: ${message} `;
    if (verbose && metadata) msg += JSON.stringify(metadata, null, 2);
    return msg;
  }),
);

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  msg: 'HTTP {{ req.method }} {{req.url}} {{ res.statusCode }}',
  format: logFormatMaker(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: logFormatMaker(true),
});
