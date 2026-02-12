import { z } from 'zod'

export const updateMaintenanceSchema = z
    .object({
        isMaintenance: z.boolean(),
    })
    .openapi({
        example: {
            isMaintenance: true,
        },
    })
