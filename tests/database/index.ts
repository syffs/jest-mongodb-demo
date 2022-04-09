import {EJSON} from 'bson'
import mongoose, {Document} from 'mongoose'
import Int32 from 'mongoose-int32'

import type {IUser} from '~/types/users'

import {User} from '~/users'

import usersData from './users.json'

const deserializeBSON = (obj) => EJSON.deserialize(obj)

/**
 * database manager used as a mongodb mock
 */
export async function provision(): Promise<void> {
    const promises = []
    promises.push(
        User.insertMany(deserializeBSON(usersData) as IUser & Document),
    )
    await Promise.all(promises).catch(e => {
        console.log('error inserting data', e)
    })
}
export async function unprovision(): Promise<void> {
    const promises = []
    promises.push(
        User.deleteMany({}),
    )
    await Promise.all(promises)
}
