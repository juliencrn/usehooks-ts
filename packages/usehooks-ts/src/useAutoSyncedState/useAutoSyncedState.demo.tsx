import { useAutoSyncedState } from '..'

export default function Component() {
  let artificialApiResponse = 'Edgar Allan Poe'

  const [name] = useAutoSyncedState(artificialApiResponse)

  setTimeout(() => {
    artificialApiResponse = 'John Doe'
  }, 3000)

  return <div>Hello {name}</div>
}
