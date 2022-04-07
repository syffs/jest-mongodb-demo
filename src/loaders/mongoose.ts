import mongoose from 'mongoose'
import { Db } from 'mongodb'
import Int32 from 'mongoose-int32'
import config from '~/config'

Int32.loadType(mongoose)

export default async (): Promise<Db> => {
    const connection = await mongoose.connect(config.database.mongodbUri)

    return connection.connection.db
}
