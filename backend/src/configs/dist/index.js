"use strict";
exports.__esModule = true;
var database_json_1 = require("./database.json");
var configs = {
    development: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: database_json_1["default"].development
    },
    test: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: database_json_1["default"].development
    },
    production: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: database_json_1["default"].development
    }
};
var NODE_ENV = process.env.NODE_ENV || 'development';
exports["default"] = configs[NODE_ENV];
