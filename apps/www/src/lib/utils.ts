import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { BaseHook, NavItem } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapHookToNavLink(hook: BaseHook): NavItem {
  return {
    title: hook.name,
    href: hook.path,
  }
}
