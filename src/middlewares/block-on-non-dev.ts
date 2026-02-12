import { Context, Next } from 'hono'
import * as HttpStatusPhrases from '@const/http-status-phrases'
import * as HttpStatusCodes from '@const/http-status-codes'

export async function blockOnNonDev(c: Context, next: Next) {
    // Your middleware logic here, e.g., authentication, logging
    const node_env = c.env?.NODE_ENV || process.env.NODE_ENV
    if (node_env !== 'dev') {
        return c.json(
            { message: HttpStatusPhrases.UNAUTHORIZED },
            HttpStatusCodes.UNAUTHORIZED,
        )
    }
    await next()
}
