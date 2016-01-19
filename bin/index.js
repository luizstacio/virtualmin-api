import request from 'request-promise';
import _ from 'lodash';

const DefaultConfig = {
  host: null,
  user: null,
  port: 10000,
  path: '/virtual-server/remote.cgi',
  password: null
};

class Command {
  constructor(name, virtualmin) {
    this.name = name;
    this.virtualmin = virtualmin;

    return this.exec.bind(this);
  }

  exec(params = {}) {
    params.program = this.name;
    params.json = true;

    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: this.virtualmin.getUrl(),
        qs: params,
        rejectUnauthorized: false
      }).then((response) => {
        try {
          response = JSON.parse(response);

          if ( response.status !== "success" ) return reject(response);

          resolve(response.data);
        } catch(e) {
          reject(e);
        }
        reject(response);
      }).catch(reject);
    });
  }
}

class Virtualmin {
  constructor(config = {}) {
    this.config = _.clone(DefaultConfig);
    
    _.merge(this.config, config);

    if (!this.config.host) {
      throw new Error('User and Password is required!');
    }

    if (!this.config.user || !this.config.password) {
      throw new Error('User and Password is required!');
    }
  }

  getUrl() {
    return `${this.getUrlAuth()}:${this.config.port}${this.config.path}`;
  }

  getUrlAuth() {
    return this.applyAuth(this.config.host);
  }

  applyAuth(url) {
    return url.replace(/^(http?s:\/\/|)/, `https://${this.config.user}:${this.config.password}@`);
  }

  command(action) {
    return new Command(action, this);
  }
}

module.exports = Virtualmin;