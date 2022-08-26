const httpContext = require("express-http-context"),
    { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const fs = require("fs"),
    isEmpty = require("is-empty");
// Create the log directory if it does not exist
if (!fs.existsSync("logger")) {
    fs.mkdirSync("logger");
}

//function for writing the module name
const getLabel = (callingModule) => {
    const parts = callingModule.filename.split("/");
    return parts[parts.length - 2] + "/" + parts.pop();
};

//function for getting continuation id format
const continuationIdFormat = format((info, opts) => {
    const reqId = httpContext.get("reqId");
    const userId = httpContext.get("userId");
    info.reqId = isEmpty(reqId) === false ? reqId : "non-http-log";
    info.userId = isEmpty(userId) === false ? userId : "non-user-log";
    return info;
});
// instantiate a new Winston Logger with the settings defined above
const logger = (callingModule) => {
    return createLogger({
        transports: [
            new transports.DailyRotateFile({
                level: "debug",
                filename: `logger/%DATE%-results.log`,
                datePattern: "YYYY-MM-DD",
                format: format.combine(
                    format.label({
                        label: getLabel(callingModule),
                    }),
                    format.simple(),
                    format.splat(),
                    format.timestamp({
                        format: "YYYY-MM-DD HH:mm:ss",
                    }),
                    continuationIdFormat(),
                    format.printf(
                        (info) =>
                            `[Req ID: ${info.reqId} and User ID: ${info.userId}]: ${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
                    )
                ),
                handleExceptions: true,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                maxDays: "10d",
                colorize: false,
            }), //configuration for the daily log file rotation

        ],
        exitOnError: false, // do not exit on handled exceptions
    });
};

module.exports = logger;
