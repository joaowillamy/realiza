
import axios, { AxiosResponse } from 'axios';
import { frontendEnvs } from '@realiza/shared/utils';
import { CreateUserDto } from '../dto/createUserDto';
import { CreateUserResponseDto } from '../dto/createUserResponseDto';

const authServiceInstance = axios.create({
  baseURL: `${frontendEnvs.apiBaseUrl}/authentication`,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

export function AuthService() {

  const createUser = async (user: CreateUserDto): CreateUserResponseDto  => {
    try {
      const response = await authServiceInstance.post<CreateUserDto, AxiosResponse<{message: string | string[]}>>('/signup', user);
      return {
        error: false,
        message: response.data.message
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {
        handleAxiosError('createUser', error)
        return {
          error: true,
          message: error.response.data.message
        };
      }

      throw handleUnexpectedError('createUser', error as Error);
    }
  }

  function handleAxiosError(functionName: string, error: Error) {
    console.warn(`[API] AuthService.${functionName}`, error)
  }

  function handleUnexpectedError(functionName: string, error: Error) {
    const message = `[JS] AuthService.${functionName}`
    console.error(message, error)
    return Error(message)
  }

  return { createUser }
}



export default AuthService;
