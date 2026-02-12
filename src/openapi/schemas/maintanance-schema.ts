import { z } from 'zod'

export const isMaintenanceSchema = z
    .object({
        isMaintenance: z.boolean(),
    })
    .openapi({
        example: {
            isMaintenance: true,
        },
    })
