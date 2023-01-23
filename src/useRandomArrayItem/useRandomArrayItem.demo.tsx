import { useRandomArrayItem } from '..'

export default function Component() {
  const items = ['item-one', 'item-two', 'item-three', 'item-four']
  const randomItem = useRandomArrayItem(items, 1500)

  return <div>Random Item: {randomItem}</div>
}
