import { useOnBackButtonClicked } from '..'

export default function Component() {
  useOnBackButtonClicked(() => {
    console.log('Went back. Callback function triggered')
  })

  return (
    <div>
      Hello useOnBackButtonClicked. Try me by clicking the navigator`&prime;`s
      back button
    </div>
  )
}
