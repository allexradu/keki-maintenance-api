import type { ZodSchema } from '@const/types'

import { jsonContent } from '@openapi/helpers/json-content'

export const jsonContentRequired = <T extends ZodSchema>(
    schema: T,
    description: string,
) => {
    return {
        ...jsonContent(schema, description),
        required: true,
    }
}
