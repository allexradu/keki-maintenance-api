import { AppOpenAPI } from '@const/types'
import packageJson from '../../package.json'
import { apiReference } from '@scalar/hono-api-reference'
import { blockOnNonDev } from '@middlewares/block-on-non-dev'
import { Context, Next } from 'hono'
import { ROUTES } from '@const/routes'
import { cors } from 'hono/cors'

export function configureOpenApi(app: AppOpenAPI) {
    app.use(
        '*',
        cors({
            origin: (origin, c) => {
                const allowed = c.env.ALLOWED_ORIGINS.split(',').map(
                    (o: string) => o.trim(),
                )
                return allowed.includes(origin) ? origin : ''
            },
            allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        }),
    )

    app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
        type: 'http',
        scheme: 'bearer',
    })
    app.use(ROUTES.PUBLIC_DOC, blockOnNonDev)
    app.use(ROUTES.PUBLIC_DEV_DOC, blockOnNonDev)
    app.use(ROUTES.PUBLIC_DOCS, blockOnNonDev)

    app.doc(ROUTES.PUBLIC_DEV_DOC, {
        openapi: '3.0.0',
        info: {
            title: 'Keki Maintenance API Documentation',
            version: packageJson.version,
        },
    })

    app.get(ROUTES.PUBLIC_DOC, async (c: Context) => {
        const response = await fetch(
            c.env?.PROD_DOCUMENTATION_URL || process.env.PROD_DOCUMENTATION_URL,
        )

        const data = await response.json()
        if (data) {
            return c.json(data)
        }

        return c.json({ message: 'No data found' })
    })

    app.get(ROUTES.PUBLIC_DOCS, (c: Context, next: Next) => {
        const env = c.env?.NODE_ENV
        const openApiUrl =
            env === 'dev' ? ROUTES.PUBLIC_DEV_DOC : ROUTES.PUBLIC_DOC

        return apiReference({
            pageTitle: 'Keki Maintenance API Documentation',
            theme: 'purple',
            defaultHttpClient: {
                targetKey: 'js',
                clientKey: 'fetch',
            },
            spec: {
                url: openApiUrl,
            },
        })(c, next)
    })
}
