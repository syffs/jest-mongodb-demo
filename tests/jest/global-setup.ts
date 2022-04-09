// import 'tsconfig-paths/register'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connect } from './db-connect'

export = async function globalSetup() {

    /** it's needed in global space, because we don't want to create a new instance every time */
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    console.log('global-setup: db uri is', uri);
    (global as any).__MONGOINSTANCE = instance;
    process.env.__MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));

    // const connection = await connect({ dbName: 'test' });
    // await connection.db.dropDatabase();
    // await connection.close();
};
