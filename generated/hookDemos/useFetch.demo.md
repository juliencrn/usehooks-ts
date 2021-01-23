```tsx
import React from 'react'

import useFetch from './useFetch'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default function Component() {
  const url = `http://jsonplaceholder.typicode.com/posts`
  const { status, data, error } = useFetch<Post[]>(url)
  console.log({ status, data, error })

  // your component JSX
  return <div>{status}</div>
}
```
