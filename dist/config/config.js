"use strict";

var _dotenv = require("dotenv");

(0, _dotenv.config)();
module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL_DEV',
    dialect: 'postgres',
    logging: false
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL_PROD',
    dialect: 'postgres'
  }
};