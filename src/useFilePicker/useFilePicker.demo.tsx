import { useFilePicker } from '..'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default function Component() {
  const [result, Picker, id] = useFilePicker('')

  return (
    <>
      <Picker>
        <button>Pick file</button>
      </Picker>
      <p>{result}</p>
    </>
  )
}
