import {EJSON} from 'bson'
import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose, {Document} from 'mongoose'
import Int32 from 'mongoose-int32'

import type {IUser} from '~/types/users'

import {User} from '~/users'

import usersData from './users.json'

Int32.loadType(mongoose)

const deserializeBSON = (obj) => EJSON.deserialize(obj)

/**
 * database manager used as a mongodb mock
 */
export class DBManager {
    private server: MongoMemoryServer
    private static _instance: DBManager
    static getInstance(): DBManager {
        if(!this._instance) {
            this._instance = new DBManager()
        }
        return this._instance
    }

    private constructor() {
    }
    async start(): Promise<string> {
        this.server = await MongoMemoryServer.create()
        return this.server.getUri()
    }
    async provision(): Promise<void> {
        const promises = []
        promises.push(
            User.insertMany(deserializeBSON(usersData) as IUser & Document),
        )
        await Promise.all(promises).catch(e => {
            console.log('error inserting data', e)
        })
    }
    async unprovision(): Promise<void> {
        const promises = []
        promises.push(
            User.deleteMany({}),
        )
        await Promise.all(promises)
    }
    async stop() {
        return await this.server.stop()
    }
}

export const dbManager = DBManager.getInstance()
