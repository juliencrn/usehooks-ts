import { useCopyToClipboard } from './useCopyToClipboard'

export default function Component() {
  const [copiedText, copy] = useCopyToClipboard()

  // Using callbacks (recommended)
  const handleCopyWithCallbacks = (text: string) => () => {
    copy(text, {
      onSuccess: ({ text }) => {
        console.log('Copied!', { text })
      },
      onError: ({ error, text }) => {
        console.error('Failed to copy!', { error, text })
      },
    })
  }

  // Using promises (backward compatible)
  const handleCopyWithPromise = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log('Copied!', { text })
      })
      .catch(error => {
        console.error('Failed to copy!', error)
      })
  }

  return (
    <>
      <h1>Click to copy:</h1>

      <h2>Using callbacks:</h2>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={handleCopyWithCallbacks('A')}>A</button>
        <button onClick={handleCopyWithCallbacks('B')}>B</button>
        <button onClick={handleCopyWithCallbacks('C')}>C</button>
      </div>

      <h2>Using promises (backward compatible):</h2>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={handleCopyWithPromise('X')}>X</button>
        <button onClick={handleCopyWithPromise('Y')}>Y</button>
        <button onClick={handleCopyWithPromise('Z')}>Z</button>
      </div>

      <p>Copied value: {copiedText ?? 'Nothing is copied yet!'}</p>
    </>
  )
}
