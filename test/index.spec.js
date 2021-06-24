import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/index';

chai.should();
chai.use(chaiHttp);

// import http from 'http';
// const http = require('http');

describe('ProductAPI', () => {
  describe('GET /', () => {
    it('should return 200', (done) => {
      chai
        .request(app)
        .get('/')
        .then((res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return', () => {});
  });
});
