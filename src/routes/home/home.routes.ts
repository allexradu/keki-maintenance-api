import { createRoute } from '@hono/zod-openapi'
import { METHODS, ROUTES } from '@const/routes'
import * as HttpStatusCodes from '@const/http-status-codes'
import { jsonContent } from '@openapi/helpers/json-content'
import createMessageObjectSchema from '@openapi/schemas/create-message-object'

const tags = ['Home']

export const home = createRoute({
    description: 'Home',
    path: ROUTES.PUBLIC_HOME,
    method: METHODS.GET,
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            createMessageObjectSchema('Welcome to Keki Maintenance API'),
            'Welcome to Keki API',
        ),
    },
})

export type HomeRoute = typeof home
