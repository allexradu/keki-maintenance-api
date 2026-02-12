import {
    boolean,
    index,
    pgTable,
    uuid,
    varchar,
    text,
    real,
    json,
} from 'drizzle-orm/pg-core'

const fields = {
    id: uuid('id').primaryKey().defaultRandom(),
    code: varchar('code', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    uuidValue: uuid('uuid_value'),
    textValue: text('text_value'),
    numericValue: real('numeric_value'),
    keyValuePairs: json('key_value_pairs'),
    booleanValue: boolean('boolean_value'),
    disabled: boolean('disabled').notNull().default(false),
}

export const platformSetting = pgTable('platform_settings', fields, (table) => {
    return {
        codeIndex: index('platform_settings_code_index').on(table.code),
    }
})
