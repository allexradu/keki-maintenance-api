import { createRouter } from '@lib/create-router'
import * as handlers from '@routes/home/home.handlers'
import * as routes from '@routes/home/home.routes'

export const router = createRouter().openapi(routes.home, handlers.home)
