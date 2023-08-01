import { useBatteryStatus } from '..'

export default function Component() {
const [two] = useBatteryStatus()

return <div>Hello {two}</div>
}
