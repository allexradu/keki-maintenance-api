import type { ZodSchema } from '@const/types'

export const jsonContent = <T extends ZodSchema>(
    schema: T,
    description: string,
) => {
    return {
        content: {
            'application/json': {
                schema,
            },
        },
        description,
    }
}
