import { useEffect, useState } from 'react'

export function useCloseAlert() {
  const [canClose, setCanClose] = useState(true)

  useEffect(() => {
    if (canClose) {
      // eslint-disable-next-line  @typescript-eslint/no-empty-function
      window.onbeforeunload = () => {}
    } else {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      window.onbeforeunload = (e: any) => {
        // just in case
        if (canClose) return

        e.returnValue = 'Changes you made may not be saved.'
        return 'Changes you made may not be saved.'
      }
    }
  }, [canClose])

  return setCanClose
}
