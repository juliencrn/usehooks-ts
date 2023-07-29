import { useCloseAlert } from '..'

export default function Component() {
  const setCanClose = useCloseAlert()

  return <div>
    <button onClick={() => setCanClose(false)}>Alert when trying to close window</button>
    <button onClick={() => setCanClose(true)}>Allow user to close page immediately</button>
  </div>
}
