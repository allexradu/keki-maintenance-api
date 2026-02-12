import type { ZodSchema } from '@const/types'

import oneOf from './one-of.js'

export const jsonContentOneOf = <T extends ZodSchema>(
    schemas: T[],
    description: string,
) => {
    return {
        content: {
            'application/json': {
                schema: {
                    oneOf: oneOf(schemas),
                },
            },
        },
        description,
    }
}
