"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//declare the port
const port = process.env.PORT || 5000; //create the server

const server = _http.default.createServer(_app.default);

exports.server = server;
server.listen(port, () => {
  console.log(_chalk.default.green.inverse(`Server is running on port ${port}\nVisit http://localhost:${port}`));
});