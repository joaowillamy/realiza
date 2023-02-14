import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { ConfirmPasswordDto } from '../dto/confirmPasswordDto';
import { CreateUserDto } from '../dto/createUserDto';
import { CreateUserResponseDto } from '../dto/createUserResponseDto';
import { DefaultResponseDto } from '../dto/DefaultResponseDto';
import { MeDto } from '../dto/meDto';
import { MeResponseDto } from '../dto/meResponseDto';
import { SendEmailDto } from '../dto/sendEmailDto';
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

  const sendRecoverPasswordEmail = async (email: SendEmailDto) => {
    try {
      const response = await serviceInstance.post(`/send-recover-email`, email);
      return {
        token: response.data.token,
        error: false,
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {
        handleAxiosError('sendRecoverPasswordEmail', error);
        return {
          error: true,
          message: error.response.data.message,
        };
      }

      throw log.unexpectedError('sendRecoverPasswordEmail', error as Error);
    }
  };

  const confirmPasswordByToken = async (token: string, data: ConfirmPasswordDto): Promise<DefaultResponseDto> => {
    try {
      const response = await serviceInstance.patch<DefaultResponseDto>(`/reset-password/${token}`, data);
      return {
        error: false,
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status && error.response?.data?.message) {
        log.apiError('confirmPasswordByToken', error);
        return {
          error: true,
          message: error.response.data.message,
        };
      }

      throw log.unexpectedError('confirmPasswordByToken', error as Error);
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
    confirmPasswordByToken,
    me,
  };
}

export default AuthService;
function handleAxiosError(arg0: string, error: AxiosError<any, any>) {
  throw new Error('Function not implemented.');
}

function handleUnexpectedError(arg0: string, arg1: Error) {
  throw new Error('Function not implemented.');
}
