/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional().default(''),
    NEXT_PUBLIC_ALGOLIA_APP_ID: z.string().optional().default(''),
    NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: z.string().optional().default(''),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional().default(''),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },
})
