import { Context, MiddlewareHandler, Next } from 'hono'
import pino from 'pino'
import { ENVS } from '@const/types'

const logger = pino()

type level = 'info' | 'error' | 'warning' | 'debug'

const simpleLogger = (
    level: level,
    c: Context,
    message: string,
    status: number = 900,
) => {
    const isProduction = ENVS.NODE_ENV === 'production'
    const correlationId = c.var.correlationId

    const method = c.req.method
    const url = c.req.url
    const resMessage = `${method} ${url} ${message} ${correlationId}`
    // Construct the log object
    const logObject = {
        message: resMessage,
        timestamp: pino.stdTimeFunctions.isoTime(),
        method: method,
        status: status,
        url: url,
        correlationId,
    }

    switch (level) {
        case 'info':
            logger.info(isProduction ? JSON.stringify(logObject) : resMessage)
            break
        case 'error':
            logger.error(isProduction ? JSON.stringify(logObject) : resMessage)
            break
        case 'warning':
            logger.warn(isProduction ? JSON.stringify(logObject) : resMessage)
            break
        case 'debug':
            logger.debug(isProduction ? JSON.stringify(logObject) : resMessage)
            break
    }
}

export type Logger = typeof simpleLogger

export function pinoLogger(): MiddlewareHandler {
    return async (c: Context, next: Next) => {
        // Add logger to the context
        c.set('logger', simpleLogger)
        const correlationId = c.var.correlationId
        const isProduction = ENVS.NODE_ENV === 'production'
        const start = Date.now()

        await next()

        const duration = Date.now() - start
        const method = c.req.method
        const url = c.req.url
        const status = c.res.status

        const resMessage = `${method} ${url} ${status} ${duration}ms ${correlationId}`
        // Construct the log object
        const logObject = {
            message: resMessage,
            timestamp: pino.stdTimeFunctions.isoTime(),
            method: method,
            status: status,
            url: url,
            correlationId,
            responseTime: duration,
        }

        // Log the request completion
        logger.info(isProduction ? JSON.stringify(logObject) : resMessage)
    }
}
