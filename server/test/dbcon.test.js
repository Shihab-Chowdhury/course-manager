
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
// import {dbconfig} from '../src/utils/config/config.js'


const mongod = await MongoMemoryServer.create();
/**
 * Connect to the in-memory database.
 */
export const connectToMockMongoDB = async () => {
    const uri = mongod.getUri();
    // dbconfig.database_url = uri;
    // console.log(uri);
    const mongooseOpts = {
        useNewUrlParser: true,

        useUnifiedTopology:true
    };

    return mongoose.connect(uri,{dbName:"test-db"} ,mongooseOpts);
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeMockConnection = () => {
    mongoose.connection.dropDatabase();
    mongoose.connection.close();
    mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
// module.exports.clearDatabase = async () => {
//     const collections = mongoose.connection.collections;

//     for (const key in collections) {
//         const collection = collections[key];
//         collection.deleteMany();
//     }
// }