import type { ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { INTERNAL_SERVER_ERROR, OK } from '@const/http-status-codes'
import { ENVS } from '@const/types'

const onError: ErrorHandler = (err, c) => {
    const currentStatus: number =
        'status' in err && typeof err.status === 'number'
            ? err.status
            : c.newResponse(null).status
    const statusCode: ContentfulStatusCode =
        currentStatus !== OK &&
        currentStatus >= 200 &&
        currentStatus < 999 &&
        currentStatus !== 204
            ? (currentStatus as ContentfulStatusCode)
            : INTERNAL_SERVER_ERROR
    const showStackTrace = ENVS.SHOW_STACK_TRACE === 'true'
    return c.json(
        {
            message: err.message,
            stack: showStackTrace ? err.stack : undefined,
        },
        statusCode,
    )
}

export default onError
