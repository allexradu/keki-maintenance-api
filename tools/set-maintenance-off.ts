import { platformSetting } from '@db/schema'
import { Db } from '@db/db'
import { config } from 'dotenv'
import { PlatformSettings } from '@const/platform-settings'
import { eq } from 'drizzle-orm'

config({ path: '.dev.vars' })

async function setMaintenanceOn() {
    const dbInstance = new Db()
    const db = dbInstance.getDb()

    await db
        .update(platformSetting)
        .set({
            booleanValue: false,
        })
        .where(eq(platformSetting.code, PlatformSettings.IS_MAINTENANCE_ON))
        .execute()

    console.log('Maintenance mode set to OFF')
}

;(async function () {
    await setMaintenanceOn()
})()
