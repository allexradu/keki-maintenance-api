import { platformSetting } from '@db/schema'
import { Db } from '@db/db'
import { config } from 'dotenv'
import { PlatformSetting } from '@data/DTO/core/platform-setting.command'
import { PlatformSettings } from '@const/platform-settings'

config({ path: '.dev.vars' })

async function addPlatformSettings() {
    const dbInstance = new Db()
    const db = dbInstance.getDb()

    const payload = [
        new PlatformSetting({
            code: PlatformSettings.IS_MAINTENANCE_ON,
            title: 'IS MAINTENANCE ON',
            description: 'Record of whether the app is in maintenance mode',
            booleanValue: false,
        }),
    ]
    await db.insert(platformSetting).values(payload).execute()

    console.log('Platform settings imported')
}

;(async function () {
    console.log('Initial import')

    await addPlatformSettings()
})()
