import { Context, MiddlewareHandler, Next } from 'hono'
import { envKeys, ENVS } from '@const/types'
import { config } from 'dotenv'

config({ path: '.dev.vars' })

export function checkEnvs(): MiddlewareHandler {
    return async (c: Context, next: Next) => {
        if (!c.env && !process.env) {
            throw new Error('No environment variables found')
        }

        const missingEnvs = []
        for (const key of envKeys) {
            if (key !== 'HYPERDRIVE') {
                const contextEnv = c.env && c.env[key]
                const processEnv = process.env && process.env[key]
                const env = contextEnv || processEnv
                if (!env) {
                    missingEnvs.push(key)
                } else {
                    ENVS[key] = env
                }
            } else {
                ENVS[key] = c.env.HYPERDRIVE.connectionString
            }
        }

        if (missingEnvs.length) {
            throw new Error(
                `Missing environment variables: ${missingEnvs.join(', ')}`,
            )
        } else {
            await next()
        }
    }
}
