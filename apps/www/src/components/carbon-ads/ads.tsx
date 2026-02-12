import type { ComponentPropsWithoutRef } from 'react'

import { useScript } from './use-script'
import { cn } from '@/lib/utils'

const adIds = {
  home: 'CWYIE23E',
  docs: 'CWYIEKJU',
} as const

type CarbonAdsProps = {
  variant: keyof typeof adIds
  /** @default cover */
  format?: 'responsive' | 'cover'
} & ComponentPropsWithoutRef<'div'>

export function CarbonAds({
  variant,
  format = 'cover',
  className,
  ...props
}: CarbonAdsProps) {
  const ref = useScript(
    `//cdn.carbonads.com/carbon.js?serve=${adIds[variant]}&placement=usehooks-tscom&format=${format}`,
    '_carbonads_js',
  )

  return <div {...props} className={cn('carbon-wrap', className)} ref={ref} />
}
