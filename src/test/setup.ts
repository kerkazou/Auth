import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';


declare global {
    function signin(): Promise<string[]>
}

let mongo : any;
beforeAll(async () => {
    process.env.JWT_KEY = "abcdef";
     mongo = await MongoMemoryServer.create();
    const mongoUri =  mongo.getUri();
  

    mongoose.connect(mongoUri, {});
    
});
beforeEach(async () => {
    /*const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    } */
    for (const i in mongoose.connection.collections) {
        if (mongoose.connection.collections[i]) {
          mongoose.connection.collections[i]
            .deleteMany({})
            // Catch err when try to drop unexistent collection
            .catch(err => {});
        }
      }

    
  });
  
  afterAll(async () => {
    //await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  });
  

  global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';
  
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email,
        password
      })
      .expect(201);
  
    const cookie = response.get('Set-Cookie');
  
    return cookie;
  };
  