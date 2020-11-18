```tsximport React, { useEffect } from 'react'

import useScript from './useScript'

// it's an example, use your types instead
declare const jQuery: any

export default function Component() {
  // Load the script asynchronously
  const status = useScript(`https://code.jquery.com/jquery-3.5.1.min.js`)

  useEffect(() => {
    if (typeof jQuery !== 'undefined') {
      // jQuery is loaded => print the version
      alert(jQuery.fn.jquery)
    }
  }, [status])

  return (
    <div>
      <p>{`Current status: ${status}`}</p>

      {status === 'ready' && <p>You can use the script here.</p>}
    </div>
  )
}
```