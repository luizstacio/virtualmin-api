'use strict';

const chai = require('chai');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('chai').expect;
const assert = require('chai').assert
var nock = require('nock');
var config = {
  host: 'foo.com',
  user: 'senha',
  password: 'password'
};
var Virutalmin = require('../');

lab.experiment('Virtualmin', () => {

  lab.test('create new Virtualmin()', (done) => {
    var connection = new Virutalmin(config);

    expect(connection).to.be.an.instanceof(Virutalmin);
    
    done();
  });

  lab.test('execute Command', (done) => {
    var connection = new Virutalmin(config);
    var program = 'modify-web';
    var domain = 'foo.com';
    var proxy = 'foo.bar';
    var json = true;
    var data = {};

    nock(`https://${config.user}:${config.password}@${config.host}:10000`)
      .get('/virtual-server/remote.cgi')
      .query({
        program,
        domain,
        proxy,
        json
      })
      .reply(200, {
        status: 'success',
        data
      });

    connection.command(program)({ domain, proxy })
      .then((data) => {
        assert.equal(data, data, 'Data received is not equals');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
