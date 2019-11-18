import request from 'supertest';
import * as jwt from 'jsonwebtoken';

import { IUser } from '../utils/user-db';
import { lockedResource } from '../controls/getLockedResource';
import { app } from '../app';

app.set('port', 80);

const demoUser: IUser = {
  username: 'Mr McTest',
  password: 'test'
};

describe('Test the root path', () => {
  it('It should response the GET method', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
  });
});

const registerUser = (user: IUser): Promise<any> => {
  return new Promise(async resolve => {
    const response = await request(app)
      .post('/api/signup')
      .send(user);
    const token = response.body.data.token;
    resolve(token);
  });
};

describe('Test the register-login sequence', () => {
  let loginToken: any;

  it('It should response the POST *REGISTER* route with correct JWT', async () => {
    const registrationToken = await registerUser(demoUser);
    const decoded: any = jwt.decode(registrationToken);
    expect(decoded['username']).toBe(demoUser.username);
  });

  it('It should response the POST *LOGIN* route with correct JWT', async () => {
    const response = await request(app)
      .post('/api/signin')
      .send(demoUser);

    loginToken = response.body.data.token;
    const decoded: any = jwt.decode(loginToken);
    expect(decoded['username']).toBe(demoUser.username);
  });

  it('It should response the GET *LOCKED* route with login JWT', async () => {
    const response = await request(app)
      // .get('/locked?print-req=1')
      .get('/api/locked')
      .set('Authorization', 'Bearer ' + loginToken);
    expect(response.status).toBe(200);
    expect(response.body.data.resource).toMatchObject(lockedResource);
  });
});
