import { useUnmount } from '..'

export default function Component() {
const [two] = useUnmount()

return <div>Hello {two}</div>
}
