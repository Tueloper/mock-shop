"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _product = _interopRequireDefault(require("./product"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = app => {
  app.get('/api/v1', (req, res) => res.status(200).send({
    status: 'success',
    data: 'Mock Shop Node server'
  }));
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to Mock Shop');
  });
  app.use('/api/v1', [_auth.default, _product.default, _user.default]);
  app.all('/*', (req, res) => res.status(404).send({
    status: 'error',
    error: 'This route is unavailable on this server'
  }));
};

exports.default = _default;