import mongoose from 'mongoose'
import mongooseLoader from './mongoose'

import {logger} from './logger'

import {validateConfig} from '~/config'


export default async () => {
    validateConfig()
    logger.info('✌️ config validated')
    await mongooseLoader()
    logger.info('✌️ DB loaded and connected!')
}

export const gracefulExit = async (code: number = 0, exit: boolean = true) => {
    await mongoose.connection.close()
    logger.info('graceful-exit: mongoose disconnected')
    logger.info('graceful-exit: sayonara !')
    if(exit) process.exit(code)
}

export * from './logger'
