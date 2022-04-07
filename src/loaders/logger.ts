import winston, { createLogger, format, transports } from 'winston'

import config from '~/config'

export const logger = createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
    ),
    transports: [

    ]
})

logger.add(new transports.Console({
    format: format.combine(
        format.printf(i =>
            format.colorize().colorize(i.level, `${i.timestamp}${i.traceId ? ` [${i.traceId}]`: ''} ${i.level.toUpperCase()} `) + i.message),
    )
}))
logger.debug('✌️ Logger initialized at debug level')
