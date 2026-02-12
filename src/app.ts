import { createApp } from '@lib/create-app'
import { router as indexRouter } from '@routes/home/home.index'
import { router as maintenanceRouter } from '@routes/maintenance/maintenance.index'
import { configureOpenApi } from '@lib/configure-open-api'

const app = createApp()

configureOpenApi(app)

const publicRouters = [indexRouter, maintenanceRouter] as const

const privateRouters = [...publicRouters] as const

const routes = privateRouters

routes.forEach((route) => {
    app.route('/', route)
})

export default app
