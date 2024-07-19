'use client'

import { useState } from 'react'

import { Check, Copy } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { cn } from '@/lib/utils'

type CommandCopyProps = {
  command: Record<string, string> | string
  defaultCommand?: string
} & ComponentProps<'code'>

export function CommandCopy({
  className,
  command,
  defaultCommand,
  ...props
}: CommandCopyProps) {
  const [copiedStatus, setCopiedStatus] = useState(false)
  const [, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => {
    setCopiedStatus(true)
    void copy(text)
    setTimeout(() => {
      setCopiedStatus(false)
    }, 2000)
  }
  const renderedCommand =
    typeof command === 'string'
      ? command
      : command[defaultCommand ?? Object.keys(command)[0]]

  return (
    <code
      className={cn(
        'rounded border p-2 gap-2 font-mono text-sm flex dark:bg-[#0d1117] bg-white items-center justify-between',
        className,
      )}
      {...props}
    >
      <div className="px-2">
        {renderedCommand.split(' ').map((arg, i) => (
          <span
            key={arg}
            className={cn(i === 0 ? 'font-bold' : 'text-muted-foreground')}
          >
            {arg}{' '}
          </span>
        ))}
      </div>
      <DropdownMenu open={typeof command === 'string' ? false : undefined}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (typeof command === 'string') {
                handleCopy(renderedCommand)
              }
            }}
          >
            {copiedStatus ? (
              <Check size={16} className="text-muted-foreground" />
            ) : (
              <Copy size={16} className="text-muted-foreground" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {command &&
            Object.entries(command).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => {
                  handleCopy(value)
                }}
              >
                {key}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </code>
  )
}
