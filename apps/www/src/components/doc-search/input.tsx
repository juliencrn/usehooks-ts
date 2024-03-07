import { useRef, useState } from 'react'

import { useSearchBox } from 'react-instantsearch'

import { CommandInput } from '../ui/command'

export function SearchInput() {
  const { query, refine } = useSearchBox()
  const [inputValue, setInputValue] = useState(query)
  const inputRef = useRef<HTMLInputElement>(null)

  function setQuery(newQuery: string) {
    setInputValue(newQuery)
    refine(newQuery)
  }

  return (
    <form
      action=""
      role="search"
      noValidate
      onSubmit={event => {
        event.preventDefault()
        event.stopPropagation()

        if (inputRef.current) {
          inputRef.current.blur()
        }
      }}
      onReset={event => {
        event.preventDefault()
        event.stopPropagation()

        setQuery('')

        if (inputRef.current) {
          inputRef.current.focus()
        }
      }}
    >
      <CommandInput
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Search for hooks…"
        spellCheck={false}
        maxLength={512}
        type="search"
        value={inputValue}
        onChange={event => {
          setQuery(event.target.value)
        }}
      />
    </form>
  )
}
