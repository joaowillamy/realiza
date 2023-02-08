import { serviceFrontInstance } from "./Instance"

export const AuthCookiesService = () => {
  const deleteCookieClient = async (): Promise<void> => {
    await serviceFrontInstance.post(`/logout`)
  }

  const setTokenCookie = async (token: string) => {
    return await serviceFrontInstance.post(`/login`, { token })
  }

  return { setTokenCookie, deleteCookieClient }
}
