import { AppRouteHandler } from '@const/types'
import * as HttpStatusCodes from '@const/http-status-codes'
import { HomeRoute } from '@routes/home/home.routes'

export const home: AppRouteHandler<HomeRoute> = async (c) => {
    return c.json(
        {
            message: 'Welcome to Keki Maintenance API',
        },
        HttpStatusCodes.OK,
    )
}
