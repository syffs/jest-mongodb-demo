import dotenv from 'dotenv'
import fs from 'fs'

if (fs.existsSync('.env')) {
    console.log('Using .env file to supply config environment variables')
    dotenv.config({ path: '.env' })
}

const checkMandatoryEnvVar = (envVar: string): void => {
    if (!process.env[envVar]) {
        console.log('ERROR - missing mandatory %s environment variable. exiting...', envVar)
        process.exit(1)
    }
}

/**
 * checking mandatory env vars
 */
export const validateConfig = () => {
    [
        'MONGODB_URI',
    ].forEach((e): void => checkMandatoryEnvVar(e))
}

export default {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10) || 3000,

    database: {
        /**
         * That long string
         */
        mongodbUri: process.env.MONGODB_URI,
    },

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL :
            (process.env.NODE_ENV === 'production' ? 'warn' : 'silly'),
    },
}

