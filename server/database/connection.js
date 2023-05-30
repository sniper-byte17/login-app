import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

async function connect() {
   process.env.DEBUG = 'mongodb-memory-server:*';
   const mongod = await MongoMemoryServer.create({
      instance: {
        // Increase the timeout to 30 seconds (30000 milliseconds)
        timeout: 30000,
      },
    });
    
   const getUri= mongod.getUri();

   mongoose.set('strictQuery', true)
   const db = await mongoose.connect(getUri);
   console.log("Database connected");
   return db;
}


export default connect;
