import 'dotenv/config'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    ALGOLIA_APP_ID: z.string(),
    ALGOLIA_ADMIN_KEY: z.string(),
  },
  runtimeEnv: process.env,
})

const s = env
