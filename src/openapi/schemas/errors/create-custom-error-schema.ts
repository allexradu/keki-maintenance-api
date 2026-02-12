import { z } from '@hono/zod-openapi'

const createCustomErrorSchema = (message: string, code: string) => {
    return z
        .object({
            message: z.string(),
            code: z.string(),
        })
        .openapi({
            example: {
                message: message,
                code: code,
            },
        })
}

export default createCustomErrorSchema
