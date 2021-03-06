import expect from 'expect';
import Express from 'express';
import nock from 'nock';
import supertest from 'supertest';

import store from '../../../../../src/server/routes/store';
import { conf } from '../../../../../src/server/helpers/config';

describe('The store API endpoint', () => {
  const app = Express();
  app.use(store);

  describe('register-name route', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('passes request through to store', (done) => {
      const scope = nock(conf.get('STORE_API_URL'))
        .post('/register-name/', { snap_name: 'test-snap' })
        .matchHeader('Authorization', 'Macaroon root="dummy-macaroon"')
        .reply(201, { snap_id: 'test-snap-id' });

      supertest(app)
        .post('/store/register-name')
        .send({
          snap_name: 'test-snap',
          macaroon: 'dummy-macaroon'
        })
        .expect((res) => {
          scope.done();
          expect(res.status).toBe(201);
          expect(res.body).toEqual({ snap_id: 'test-snap-id' });
        })
        .end(done);
    });

    it('handles error responses reasonably', (done) => {
      const error = {
        code: 'user-not-ready',
        message: 'Developer has not signed agreement.'
      };
      const scope = nock(conf.get('STORE_API_URL'))
        .post('/register-name/', { snap_name: 'test-snap' })
        .matchHeader('Authorization', 'Macaroon root="dummy-macaroon"')
        .reply(403, { error_list: [error] });

      supertest(app)
        .post('/store/register-name')
        .send({
          snap_name: 'test-snap',
          macaroon: 'dummy-macaroon'
        })
        .expect((res) => {
          scope.done();
          expect(res.status).toBe(403);
          expect(res.body).toEqual({ error_list: [error] });
        })
        .end(done);
    });
  });
});
