import { useElementSize } from './index'

export default function Component() {
  const { ref, width, height } = useElementSize({ frequency: 200 })

  return (
    <div
      ref={ref}
      style={{
        border: '2px solid palevioletred',
        borderRadius: '4px',
        padding: '20px',
        width: '100%',
        resize: 'both',
        overflow: 'auto',
        maxWidth: '100%',
      }}
    >
      <h3>Resize me!</h3>
      <p>
        Width: <strong>{width}px</strong>
      </p>
      <p>
        Height: <strong>{height}px</strong>
      </p>
      <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        Drag the bottom-right corner to resize this container. Updates are
        debounced by 200ms.
      </p>
    </div>
  )
}

export function CustomFrequency() {
  const { ref, width, height } = useElementSize({ frequency: 500 })

  return (
    <div
      ref={ref}
      style={{
        border: '2px solid mediumseagreen',
        borderRadius: '4px',
        padding: '20px',
        width: '100%',
        resize: 'both',
        overflow: 'auto',
        maxWidth: '100%',
        marginTop: '20px',
      }}
    >
      <h3>Custom debounce frequency (500ms)</h3>
      <p>
        Width: <strong>{width}px</strong>
      </p>
      <p>
        Height: <strong>{height}px</strong>
      </p>
      <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        This example uses a longer debounce delay of 500ms for less frequent
        updates.
      </p>
    </div>
  )
}
