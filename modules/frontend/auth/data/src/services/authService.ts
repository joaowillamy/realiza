import axios from 'axios';

import { CreateUserDto } from '../dto/createUserDto';
import { CreateUserResponseDto } from '../dto/createUserResponseDto';
import { DefaultResponseDto } from '../dto/DefaultResponseDto';
import { MeDto } from '../dto/meDto';
import { MeResponseDto } from '../dto/meResponseDto';
import { SigninDto } from '../dto/SigninDto';
import { SigninResponseDto } from '../dto/SigninResponseDto';
import { serviceInstance, serviceProxyInstance } from './Instance';
import { Log } from './interceptors';

export function AuthService() {
  const log = Log('AuthService');

  const createUser = async (user: CreateUserDto): Promise<CreateUserResponseDto> => {
    try {
      const response = await serviceInstance.post<CreateUserResponseDto>('/signup', user);
      return {
        error: false,
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {
        log.apiError('createUser', error);
        return {
          error: true,
          message: error.response.data.message,
        };
      }

      throw log.unexpectedError('createUser', error as Error);
    }
  };

  const confirmEmailByToken = async (token: string): Promise<DefaultResponseDto> => {
    try {
      const response = await serviceInstance.patch<DefaultResponseDto>(`/${token}`);
      return {
        error: false,
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {
        log.apiError('confirmEmailByToken', error);
        return {
          error: true,
          message: error.response.data.message,
        };
      }

      throw log.unexpectedError('confirmEmailByToken', error as Error);
    }
  };

  const signin = async (user: SigninDto): Promise<SigninResponseDto> => {
    try {
      const response = await serviceInstance.post<SigninResponseDto>(`/signin`, user);
      return {
        token: response.data.token,
        error: false,
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {
        log.apiError('signin', error);
        return {
          error: true,
          message: error.response.data.message,
        };
      }

      throw log.unexpectedError('signin', error as Error);
    }
  };

  const sendRecoverPasswordEmail = async (email: string) => {
    try {
      console.log(`este é o e-mail: ${JSON.stringify(email)}`);
      const response = await serviceInstance.post(`/send-recover-email`, email);
      return {
        token: response.data.token,
        error: false,
        message: response.data.message,
      };
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.data?.message
      ) {
        handleAxiosError('sendRecoverPasswordEmail', error);
        return {
          error: true,
          message: error.response.data.message,
        };
      }

      throw handleUnexpectedError('sendRecoverPasswordEmail', error as Error);
    }
  };

  const me = async (): Promise<MeResponseDto> => {
    try {
      const response = await serviceProxyInstance.get<MeDto>(`/authentication/me`);

      return {
        me: response.data,
        error: false,
        message: 'Sucesso',
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {
        log.apiError('me', error);
        return {
          error: true,
          message: error.response.data.message,
        };
      }

      throw log.unexpectedError('me', error as Error);
    }
  };

  return {
    createUser,
    confirmEmailByToken,
    signin,
    sendRecoverPasswordEmail,
    me,
  };
}

export default AuthService;
