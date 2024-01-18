import { useCopyToClipboard } from '..'

export default function Component() {
  const [copiedText, copy] = useCopyToClipboard()
  return (
    <>
      <h1>Click to copy:</h1>
      <div style={{ display: 'flex' }}>
        <button onClick={() => copy('A')}>A</button>
        <button onClick={() => copy('B')}>B</button>
        <button onClick={() => copy('C')}>C</button>
      </div>
      <p>Copied value: {copiedText ?? 'Nothing is copied yet!'}</p>
    </>
  )
}
