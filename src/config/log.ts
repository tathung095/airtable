var log4js = require("log4js");
let log4js_extend = require("log4js-extend");
let path = require("path");
require("dotenv").config();

log4js.configure({
    appenders: {
        out: { type: "stdout" },
        file: {
            type: "dateFile",
            filename: process.env.LOG_PATH + "/airtable.log",
            keepFileExt: true,
            numBackups: 30,
            compress: true,
        },
    },
    categories: { default: { appenders: ["out", "file"], level: "debug" } },
});

let root_path = path.join(__dirname, "..");
log4js_extend(log4js, {
    path: root_path,
    format: " ",
});

var logger = log4js.getLogger("AIRTABLE");
logger.level = "debug";

export default logger;
