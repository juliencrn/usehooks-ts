import { forwardRef } from 'react'

import { Search } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

import { buttonVariants } from '../ui/button'
import { useCommandMenuContext } from './modal.context'
import { cn } from '@/lib/utils'
type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'onClick' | 'ref'
>

export const OpenButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function OpenButton(props, ref) {
    const { handleOpen } = useCommandMenuContext()

    return (
      <button
        ref={ref}
        onClick={handleOpen}
        {...props}
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'hidden sm:flex items-center w-60 text-left space-x-2 text-muted-foreground',
          props.className,
        )}
      >
        <Search className="flex-none w-5 h-5" />

        <span className="flex-auto">Quick search...</span>
        <kbd className="font-sans">
          <abbr title="Command" className="no-underline">
            ⌘
          </abbr>{' '}
          K
        </kbd>
      </button>
    )
  },
)
