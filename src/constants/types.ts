import { Logger } from '@middlewares/logger'
import type { z } from '@hono/zod-openapi'
import {
    OpenAPIHono,
    type RouteConfig,
    type RouteHandler,
} from '@hono/zod-openapi'

export const ENVS: Record<ENVKeys, string> = {} as any

export interface ENV {
    NODE_ENV: string
    DATABASE_URL: string
    FAVICON_URL: string
    SHOW_STACK_TRACE: string
    ALLOWED_ORIGINS: string
    HYPERDRIVE: object | string
    USE_DB_URL: string
    API_KEY: string
}

export type ENVKeys = keyof ENV

export const envKeys: ENVKeys[] = [
    'NODE_ENV',
    'DATABASE_URL',
    'FAVICON_URL',
    'SHOW_STACK_TRACE',
    'ALLOWED_ORIGINS',
    'HYPERDRIVE',
    'USE_DB_URL',
    'API_KEY',
]

export interface DeviceInfo {
    deviceId: string
    modelId: string | null
    os: string | null
    version: string | null
    type: 'Unknown' | 'Phone' | 'Tablet' | 'Desktop' | 'TV'
    brand: string | null
    model: string | null
    totalMemory: number | null
    platformApiLevel: number | null
    productName: string | null
    appVersion: string | null
}

export interface AppBindings {
    Variables: {
        logger: Logger
    } & ENV
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

// @ts-expect-error
export type ZodSchema = z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    AppBindings
>

export enum DOC_ENV {
    PRODUCTION = 'production',
    DEV = 'dev',
}
