import { useEffect, useRef } from 'react'

// TODO: We can't use usehooks-ts's useScript because it mounts the script in the document.body, maybe provide a way to specify the mount point
export const useScript = (scriptUrl: string, scriptId: string) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const existingScript = document.getElementById(scriptId)

    if (!existingScript) {
      const script = document.createElement('script')

      script.setAttribute('async', '')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('src', scriptUrl)
      script.setAttribute('id', scriptId)

      ref.current?.appendChild(script)
    }

    return () => {
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [scriptUrl, scriptId])

  return ref
}
