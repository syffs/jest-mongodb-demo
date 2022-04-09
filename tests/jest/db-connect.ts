import Int32 from 'mongoose-int32'
import mongoose from 'mongoose'


Int32.loadType(mongoose)

interface ExtraConnectionConfig {
    dbName?: string;
    createNewConnection?: boolean;
    differentMongoose?: mongoose.Mongoose;
}

// to not duplicate code
const staticOptions: mongoose.ConnectOptions = {
    autoIndex: true,
};

const randDbName = () => (Math.random() + 1).toString(36).substring(7)

/**
 * Make a Connection to MongoDB
 */
export async function connect(extraConfig: ExtraConnectionConfig = {}): Promise<mongoose.Connection> {
    const mongooseInstance: mongoose.Mongoose = extraConfig.differentMongoose ?? mongoose;
    let connection: mongoose.Connection;

    const options = Object.assign({}, staticOptions);

    const connectionString = `${process.env.__MONGO_URI}/${extraConfig.dbName ?? randDbName()}`;
    process.env.MONGODB_URI = connectionString
    if (extraConfig.createNewConnection) {
        connection = await mongooseInstance.createConnection(connectionString, options).asPromise();
    } else {
        await mongoose.connect(connectionString, options);
        connection = mongooseInstance.connection;
    }

    return connection;
}

/**
 * Disconnect from MongoDB
 * @returns when it is disconnected
 */
export async function disconnect(): Promise<void> {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();

    return;
}
