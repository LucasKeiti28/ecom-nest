import { HttpStatus } from '@nestjs/common';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { RegisterDTO } from 'src/auth/auth.dto';
import * as request from 'supertest';

const app = 'http://localhost:3000';

beforeAll(async() => {
  await mongoose.connect(process.env.MONGO_URI);
  await mongoose.connection.db.dropDatabase();
})

afterAll(async done => {
  await mongoose.disconnect(done)
})

describe('ROOT', () => {
  it('shoudl ping', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('AUTH', () => {
  it('should register', () => {
    const user: RegisterDTO = {
      username: 'usertest',
      password: '123123'
    };

    return request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(user)
    .expect(({body}) => {
      expect(body.token).toBeDefined();
      expect(body.user.username).toEqual('usertest');
      expect(body.password).toBeUndefined();
    })
    .expect(HttpStatus.CREATED)
  })

  it('should reject duplicate registration', () => {
    const user: RegisterDTO = {
      username: 'usertest',
      password: '123123'
    };

    return request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(user)
    .expect(({body}) => {
      expect(body.message).toEqual('User already exists');
      expect(body.code).toEqual(HttpStatus.BAD_REQUEST);
    })
    .expect(HttpStatus.BAD_REQUEST)
  })

  it('should login', () => {
    const user: RegisterDTO = {
      username: 'usertest',
      password: '123123'
    };

    return request(app)
    .post('/auth/login')
    .set('Accept', 'application/json')
    .send(user)
    .expect(({body}) => {
      expect(body.token).toBeDefined();
      expect(body.user.user.username).toEqual('usertest');
      expect(body.password).toBeUndefined();
    })
    .expect(HttpStatus.CREATED)
  })
})
