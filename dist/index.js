'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultConfig = {
  host: null,
  user: null,
  port: 10000,
  path: '/virtual-server/remote.cgi',
  password: null
};

var Command = function () {
  function Command(name, virtualmin) {
    _classCallCheck(this, Command);

    this.name = name;
    this.virtualmin = virtualmin;

    return this.exec.bind(this);
  }

  _createClass(Command, [{
    key: 'exec',
    value: function exec() {
      var _this = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      params.program = this.name;
      params.json = true;

      return new Promise(function (resolve, reject) {
        (0, _requestPromise2.default)({
          method: 'GET',
          url: _this.virtualmin.getUrl(),
          qs: params,
          rejectUnauthorized: false
        }).then(function (response) {
          try {
            response = JSON.parse(response);

            if (response.status !== "success") return reject(response);

            resolve(response.data);
          } catch (e) {
            reject(e);
          }
          reject(response);
        }).catch(reject);
      });
    }
  }]);

  return Command;
}();

var Virtualmin = function () {
  function Virtualmin() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Virtualmin);

    this.config = _lodash2.default.clone(DefaultConfig);

    _lodash2.default.merge(this.config, config);

    if (!this.config.host) {
      throw new Error('User and Password is required!');
    }

    if (!this.config.user || !this.config.password) {
      throw new Error('User and Password is required!');
    }
  }

  _createClass(Virtualmin, [{
    key: 'getUrl',
    value: function getUrl() {
      return this.getUrlAuth() + ':' + this.config.port + this.config.path;
    }
  }, {
    key: 'getUrlAuth',
    value: function getUrlAuth() {
      return this.applyAuth(this.config.host);
    }
  }, {
    key: 'applyAuth',
    value: function applyAuth(url) {
      return url.replace(/^(http?s:\/\/|)/, 'https://' + this.config.user + ':' + this.config.password + '@');
    }
  }, {
    key: 'command',
    value: function command(action) {
      return new Command(action, this);
    }
  }]);

  return Virtualmin;
}();

module.exports = Virtualmin;