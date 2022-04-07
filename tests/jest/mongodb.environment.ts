import 'tsconfig-paths/register'
import NodeEnvironment from 'jest-environment-node'
import {dbManager, DBManager} from '#/database'
// import express, {Express} from 'express'
import mongoose from 'mongoose'
import Int32 from 'mongoose-int32'


Int32.loadType(mongoose)

/**
 * @TODO use this as soon as Jest supports ts transform for testEnvironment
 *        see: https://github.com/facebook/jest/pull/8751
 */
export default class MongodbEnvironment extends NodeEnvironment {
    dbManager: DBManager = dbManager
    // expressApp: Express = express()
    constructor(config) {
        super(config)
    }

    async setup() {
        await super.setup();

        const uri = await this.dbManager.start()
        // config.database.mongodbUri = uri
        console.log('env: uri is ', uri)

        this.global.dbManager = this.dbManager

        this.global.process.env.MONGODB_URI = uri
        // this.global.__MONGO_URI__ = uri
        // config.database.mongodbUri = uri
        // await loaders()
        // await this.dbManager.provision()

        // provisioning db
        // await this.dbManager.provision()
        // console.log('provisioning complete')
        // Will trigger if docblock contains @my-custom-pragma my-pragma-value
        // if (this.docblockPragmas['my-custom-pragma'] === 'my-pragma-value') {
        //     // ...
        // }
    }

    async teardown() {
        await super.teardown()
        console.log('env: tearing down')
        await this.dbManager.unprovision()
        await this.dbManager.stop()
        await mongoose.connection.close()
    }

    // runScript<T = unknown>(script: Script): T | null {
    //     return super.runScript<T>(script);
    // }

    // handleTestEvent(event, state) {
    //     if (event.name === 'test_start') {
    //         // ...
    //     }
    // }
}
