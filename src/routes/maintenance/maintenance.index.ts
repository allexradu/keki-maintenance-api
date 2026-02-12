import { createRouter } from '@lib/create-router'
import * as handlers from '@routes/maintenance/maintenance.handlers'
import * as routes from '@routes/maintenance/maintenance.routes'

export const router = createRouter()
    .openapi(routes.maintenance, handlers.maintenance)
    .openapi(routes.updateMaintenance, handlers.updateMaintenance)
