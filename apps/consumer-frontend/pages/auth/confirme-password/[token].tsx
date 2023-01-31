import { useRouter } from 'next/router'

const ConfirmePassword = () => {
  const router = useRouter()
  const { token } = router.query

  return <p>ConfirmePassword: {token}</p>
}

export default ConfirmePassword


