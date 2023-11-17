import { useRef, useState } from 'react'

import { useIsReachedScreenEnd, useOnClickOutside } from '..'

interface ListItem {
  label: string
  value: string
}

export default function Component() {
  const [isActive, setIsActive] = useState(false)
  const [selected, setIsSelected] = useState('Choose one')

  const list: ListItem[] = [
    {
      label: 'One',
      value: 'One',
    },
    {
      label: 'Two',
      value: 'Two',
    },
    {
      label: 'Three',
      value: 'Three',
    },
    {
      label: 'Four',
      value: 'Four',
    },
  ]

  const listRef = useRef<HTMLDivElement | null>(null)
  const selectInputRef = useRef<HTMLDivElement | null>(null)

  const isListReachedScreenEnd = useIsReachedScreenEnd(
    selectInputRef,
    listRef,
    [isActive],
  )

  const handleClickOutside = () => {
    setIsActive(false)
  }

  useOnClickOutside(selectInputRef, handleClickOutside)

  return (
    <div className="myApp">
      <div className="dropdown" ref={selectInputRef}>
        {/* select btn or input */}
        <div
          onClick={() => {
            setIsActive(!isActive)
          }}
          className="select-box"
          aria-hidden="true"
        >
          {selected}
        </div>

        {/* Drop Down List */}
        <div
          ref={listRef}
          className="list-container"
          style={{
            display: isActive ? 'block' : 'none',
            ...(isListReachedScreenEnd
              ? { bottom: `${selectInputRef?.current?.clientHeight}px` }
              : { top: `${selectInputRef?.current?.clientHeight}px` }),
          }}
        >
          {list.map((item, index) => (
            <div
              key={`${index}-list`}
              onClick={() => {
                setIsSelected(item.value)
                setIsActive(!isActive)
              }}
              className="drop-down_list-item"
              aria-hidden="true"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
