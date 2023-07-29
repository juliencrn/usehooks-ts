import { useEffect, useState } from 'react';

export function useCloseAlert() {
  const [canClose, setCanClose] = useState(true)

  useEffect(() => {
    if (canClose) {
      window.onbeforeunload = () => { }
    } else {
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
