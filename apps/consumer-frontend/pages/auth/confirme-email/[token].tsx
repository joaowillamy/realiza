import { useRouter } from 'next/router'

const ConfirmeEmail = () => {
  const router = useRouter()
  const { token } = router.query

  return <p>ConfirmeEmail: {token}</p>
}

export default ConfirmeEmail;


