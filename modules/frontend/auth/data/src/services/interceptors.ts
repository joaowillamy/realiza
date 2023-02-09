import { AxiosInstance } from 'axios';

import { AuthCookiesService } from './authCookiesService';

const authCookiesService = AuthCookiesService();

export function configAxiosInstance(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.warn({ error });

      if (error.response?.status === 401)
        authCookiesService.deleteCookieClient();

      return Promise.reject(error);
    }
  );
  return instance;
}

export function handleAxiosError(functionName: string, error: Error) {
  console.warn(`[API] AuthService.${functionName}`, error);
}

export function handleUnexpectedError(functionName: string, error: Error) {
  const message = `[JS] AuthService.${functionName}`;
  console.error(message, error);
  return Error(message);
}
