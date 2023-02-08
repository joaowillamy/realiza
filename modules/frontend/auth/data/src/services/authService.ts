import axios, { AxiosResponse } from 'axios';
import { CreateUserDto } from '../dto/createUserDto';
import { CreateUserResponseDto } from '../dto/createUserResponseDto';
import { DefaultResponseDto } from '../dto/DefaultResponseDto';
import { SigninDto } from '../dto/SigninDto';
import { SigninResponseDto } from '../dto/SigninResponseDto';
import { handleAxiosError, handleUnexpectedError } from './interceptors';
import { MeResponseDto } from '../dto/meResponseDto';
import { serviceInstance, serviceProxyInstance } from './Instance';

export function AuthService() {
  const createUser = async (user: CreateUserDto): Promise<CreateUserResponseDto>  => {
    try {
      const response = await serviceInstance.post<CreateUserDto, AxiosResponse<CreateUserResponseDto>>('/signup', user);
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

  const confirmEmailByToken = async (token: string): Promise<DefaultResponseDto>  => {
    try {
      const response = await serviceInstance.patch<void, AxiosResponse<DefaultResponseDto>>(`/${token}`);
      return {
        error: false,
        message: response.data.message
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {
        handleAxiosError('confirmEmailByToken', error)
        return {
          error: true,
          message: error.response.data.message
        };
      }

      throw handleUnexpectedError('confirmEmailByToken', error as Error);
    }
  }

  const signin = async (user: SigninDto): Promise<SigninResponseDto>  => {
    try {
      const response = await serviceInstance.post<SigninDto, AxiosResponse<SigninResponseDto>>(`/signin`, user);
      return {
        token: response.data.token,
        error: false,
        message: response.data.message
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {
        handleAxiosError('signin', error)
        return {
          error: true,
          message: error.response.data.message
        };
      }

      throw handleUnexpectedError('signin', error as Error);
    }
  }

  const me = async (): Promise<MeResponseDto>  => {
    try {
      const response = await serviceProxyInstance.get<MeResponseDto>(`/authentication/me`);
      return {
        me: response.data.me,
        error: false,
        message: response.data.message
      };

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {

        handleAxiosError('me', error)
        return {
          error: true,
          message: error.response.data.message,
        };
      }

      throw handleUnexpectedError('me', error as Error);
    }
  }

  return { createUser, confirmEmailByToken, signin, me }
}



export default AuthService;
