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

export function Log(context: string) {
  return {
    apiError(functionName: string, error: Error) {
      console.warn(
        `[API] ${context}.${functionName} : ${error.name} - ${error.message} \n\n${error.stack}\n\n`,
        error
      );
    },
    unexpectedError(functionName: string, error: Error) {
      const message = `[JS] AuthService.${functionName} : ${error.name} - ${error.message} \n\n${error.stack}`;
      console.error(message, error);
      return Error(message);
    },
  };
}
