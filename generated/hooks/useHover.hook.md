```tsimport { useState, useEffect, RefObject } from 'react'

function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
): boolean {
  const [value, setValue] = useState<boolean>(false)

  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)

  useEffect(() => {
    const node = elementRef?.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)

      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [elementRef])

  return !!value
}

export default useHover
```