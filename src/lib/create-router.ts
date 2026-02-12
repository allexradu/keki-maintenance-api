import { OpenAPIHono } from '@hono/zod-openapi'
import { AppBindings } from '@const/types'
import { defaultHook } from '@openapi/default-hook'

export function createRouter() {
    return new OpenAPIHono<AppBindings>({ strict: false, defaultHook })
}
