import notFound from '@middlewares/not-found'
import onError from '@middlewares/on-error'
import { pinoLogger } from '@middlewares/logger'
import { createRouter } from '@lib/create-router'
import { faviconController } from '@app/controllers/favicon.controller'
import { checkEnvs } from '@middlewares/check-envs'

export function createApp() {
    const app = createRouter()
    app.use(pinoLogger())
    app.use(checkEnvs())
    app.get('/favicon.ico', faviconController)

    app.notFound(notFound)
    app.onError(onError)
    return app
}
