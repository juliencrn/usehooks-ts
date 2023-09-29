import { useFetch } from './useFetch'

const url = `http://jsonplaceholder.typicode.com/posts`

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default function Component() {
  const { data, post, error } = useFetch<Post[]>(url)

  const handleFormSubmission = async () => {
    // Mock-up data to be sent
    const postData = {
      userId: 1,
      title: 'New Post',
      body: 'This is the body of a new post',
    }

    try {
      await post(url, postData)
      console.log('Form submitted successfully.')
    } catch (err) {
      console.error('Form submission failed:', err)
    }
  }

  if (error) return <p>There is an error.</p>
  if (!data) return <p>Loading...</p>

  return (
    <div>
      <p>{data[0].title}</p>
      <button onClick={handleFormSubmission}>Submit Form</button>
    </div>
  )
}
