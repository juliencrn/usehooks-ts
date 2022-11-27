import * as React from 'react'

interface FilePickerOptions {
  json?: boolean
  accept?: string
}

interface FilePickerComponent {
  children?: React.ReactNode
  style?: React.CSSProperties
}

type FilePickerState<T = any> = string | (object | T)

function useFilePicker<T = any>(
  initial: string | object,
  options?: FilePickerOptions,
): [FilePickerState<T>, React.FC<FilePickerComponent>, string] {
  const [state, setState] = React.useState<FilePickerState<T>>(initial)

  const useJson = options?.json
  const whatAccept = options?.accept

  const handleChange = () => {
    if (typeof window.FileReader !== 'function')
      throw "The file API isn't supported on this browser."
    let input: any = event?.target
    if (!input) throw 'The browser does not properly implement the event object'
    if (!input.files)
      throw 'This browser does not support the `files` property of the file input.'
    if (!input.files[0]) return undefined
    let file = input.files[0]
    let fr = new FileReader()
    fr.onload = ev => {
      if (useJson) {
        try {
          setState(JSON.parse((ev.target?.result as string) || '{}') || '')
        } catch {
          setState({})
        }
      } else {
        setState((ev.target?.result as string) || '')
      }
    }
    fr.readAsText(file)
  }

  // Prevent double used id/key
  const uuid = String(Math.round(Math.random() * 9999999))

  const component = (props: FilePickerComponent) => {
    return (
      <React.Fragment>
        <label htmlFor={uuid} style={props.style}>
          {props.children}
        </label>
        <input
          id={uuid}
          key={uuid}
          type="file"
          style={{ display: 'none' }}
          accept={whatAccept}
          onChange={handleChange}
        />
      </React.Fragment>
    )
  }

  return [state, component, uuid]
}

export default useFilePicker
