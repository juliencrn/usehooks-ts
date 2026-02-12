import { createContext, useContext, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

import { useCmdK } from './use-cmd-k'

type CommandMenuContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleOpen: () => void
  handleClose: () => void
}

const initialContext: CommandMenuContextType = {
  open: false,
  setOpen: () => undefined,
  handleOpen: () => undefined,
  handleClose: () => undefined,
}

const CommandMenuContext = createContext<CommandMenuContextType>(initialContext)

export function CommandMenuProvider(props: { children: React.ReactNode }) {
  const [open, setOpen] = useState(initialContext.open)

  // Toggle the menu when ⌘K is pressed
  useCmdK(() => {
    setOpen(open => !open)
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <CommandMenuContext.Provider
      value={{ open, setOpen, handleOpen, handleClose }}
    >
      {props.children}
    </CommandMenuContext.Provider>
  )
}

export function useCommandMenuContext() {
  const context = useContext(CommandMenuContext)

  if (!context) {
    throw new Error(
      '`useCommandMenuContext` must be used within a `CommandMenuProvider`',
    )
  }

  return context
}
