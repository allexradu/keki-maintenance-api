import { drizzle as postgresDrizzle } from 'drizzle-orm/postgres-js'
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-http'
import postgres from 'postgres'
import { ENVS } from '@const/types'

import * as schema from './schema'
import { neon } from '@neondatabase/serverless'

export class Db {
    private db: any

    constructor() {
        const isDbUrl =
            ENVS.USE_DB_URL === 'true' || process.env.USE_DB_URL === 'true'

        let url: string
        if (isDbUrl) {
            url = ENVS.DATABASE_URL || process.env.DATABASE_URL!
        } else {
            url = ENVS.HYPERDRIVE
        }

        if (url.includes('neon')) {
            console.log('Using Neon with Drizzle ORM - HTTP client (neon-http)')
            const sql = neon(url, {
                fetchOptions: {
                    cache: 'no-store',
                },
            })
            this.db = neonDrizzle(sql, { schema })
        } else {
            const pgClient = postgres(url, {
                max: 1, // Single connection per request
                idle_timeout: 0, // Don't keep idle connections
                connect_timeout: 10,
                max_lifetime: 0, // Don't reuse connections across requests
            })
            this.db = postgresDrizzle(pgClient, { schema })
        }
    }

    public getDb() {
        return this.db
    }
}
