import { useOnline } from '..'

export default function Component() {
const [two] = useOnline()

return <div>Hello {two}</div>
}
