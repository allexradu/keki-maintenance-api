import { AppRouteHandler, ENVS } from '@const/types'
import * as HttpStatusCodes from '@const/http-status-codes'
import { Db } from '@db/db'
import { platformSetting } from '@db/schema'
import {
    MaintenanceRoute,
    UpdateMaintenanceRoute,
} from '@routes/maintenance/maintenance.routes'
import { PlatformSettings } from '@const/platform-settings'
import { eq } from 'drizzle-orm'
import { getFromCache, setInCache } from '@app/urtils/cache'

export const maintenance: AppRouteHandler<MaintenanceRoute> = async (c) => {
    // @ts-ignore
    const kv = c.env.CACHE_KV as KVNamespace
    const cachedValue = await getFromCache<boolean>(kv, 'maintenance_mode')

    if (cachedValue) {
        return c.json(
            {
                isMaintenance: cachedValue,
            },
            HttpStatusCodes.OK,
        )
    }

    const dbInstance = new Db()
    const db = dbInstance.getDb()

    const result = await db.select().from(platformSetting).execute()

    if (result.length == 0) {
        return c.json(
            {
                message: 'database_error',
                code: 'Database error occurred.',
            },
            HttpStatusCodes.INTERNAL_SERVER_ERROR,
        )
    }

    return c.json(
        {
            isMaintenance: result[0].booleanValue || false,
        },
        HttpStatusCodes.OK,
    )
}

export const updateMaintenance: AppRouteHandler<
    UpdateMaintenanceRoute
> = async (c) => {
    // @ts-ignore
    const kv = c.env.CACHE_KV as KVNamespace
    const allHeaders = c.req.header()
    const apiKey = allHeaders['x-api-key']

    if (apiKey !== ENVS.API_KEY) {
        return c.json(
            {
                message: 'Unauthorized',
                code: 'unauthorized',
            },
            HttpStatusCodes.UNAUTHORIZED,
        )
    }

    const data = c.req.valid('json')

    const dbInstance = new Db()
    const db = dbInstance.getDb()
    const [updateResult] = await db
        .update(platformSetting)
        .set({ booleanValue: data.isMaintenance })
        .where(eq(platformSetting.code, PlatformSettings.IS_MAINTENANCE_ON))
        .returning({ booleanValue: platformSetting.booleanValue })

    if (!updateResult) {
        return c.json(
            {
                message: 'database_error',
                code: 'Database error occurred.',
            },
            HttpStatusCodes.INTERNAL_SERVER_ERROR,
        )
    }

    await setInCache<boolean>(kv, 'maintenance_mode', updateResult.booleanValue)

    return c.json(
        { isMaintenance: updateResult.booleanValue || false },
        HttpStatusCodes.CREATED,
    )
}
