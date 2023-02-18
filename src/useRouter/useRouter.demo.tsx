import { useRouter } from '..'

export default function Component() {
  const router = useRouter()

  const userId = router.query.userId

  const handleGoToHomePage = () => {
    router.push('/')
  }

  const handleGoToUserDetailsPage = () => {
    if (userId) router.push(`/users/${userId}`);
    else handleGoToHomePage()
  }

  return <div>
    <button onClick={handleGoToHomePage}>Go Home</button>
    <button onClick={handleGoToUserDetailsPage}>View User Details</button>
  </div>
}
