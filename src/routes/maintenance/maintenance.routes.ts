import { createRoute } from '@hono/zod-openapi'
import { METHODS, ROUTES } from '@const/routes'
import * as HttpStatusCodes from '@const/http-status-codes'
import { jsonContent } from '@openapi/helpers/json-content'
import { isMaintenanceSchema } from '@openapi/schemas/maintanance-schema'
import createCustomErrorSchema from '@openapi/schemas/errors/create-custom-error-schema'
import { updateMaintenanceSchema } from '@openapi/schemas/update-maintenance-schema'
import { jsonContentRequired } from '@openapi/helpers/json-content-required'
import { apiKeyHeader } from '@openapi/schemas/api-key-header'
import { createErrorSchema } from '@openapi/schemas/errors/create-error-schema'
import createMessageObjectSchema from '@openapi/schemas/create-message-object'
import * as HttpStatusPhrases from '@const/http-status-phrases'

const tags = ['Maintenance']

export const maintenance = createRoute({
    description: 'Maintenance Status',
    path: ROUTES.PUBLIC_MAINTENANCE,
    method: METHODS.GET,
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            isMaintenanceSchema,
            'Check if the system is under maintenance',
        ),
        [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
            createCustomErrorSchema(
                'database_error',
                'Database error occurred.',
            ),
            'Database error occurred.',
        ),
    },
})

export const updateMaintenance = createRoute({
    description: 'Create a new platform company',
    path: ROUTES.PUBLIC_MAINTENANCE,
    method: METHODS.PATCH,
    request: {
        body: jsonContentRequired(
            updateMaintenanceSchema,
            'The maintenance status to update',
        ),
        headers: apiKeyHeader,
    },
    tags,
    responses: {
        [HttpStatusCodes.CREATED]: jsonContent(
            isMaintenanceSchema,
            'The created platform company',
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(updateMaintenanceSchema),
            'The validation error(s) that occurred',
        ),
        [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
            createCustomErrorSchema(
                'database_error',
                'Database error occurred.',
            ),
            'Database error occurred.',
        ),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
            createMessageObjectSchema(HttpStatusPhrases.UNAUTHORIZED),
            HttpStatusPhrases.UNAUTHORIZED,
        ),
    },
})

export type MaintenanceRoute = typeof maintenance
export type UpdateMaintenanceRoute = typeof updateMaintenance
