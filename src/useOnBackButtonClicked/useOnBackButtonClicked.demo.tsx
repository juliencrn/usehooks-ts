import { useOnBackButtonClicked } from '..'

export default function Component() {
const [two] = useOnBackButtonClicked()

return <div>Hello {two}</div>
}
