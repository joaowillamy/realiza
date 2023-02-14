import { Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { QUERY_KEYS } from '../constants/querykes';
import { ConfirmPasswordDto } from '../dto/confirmPasswordDto';
import { DefaultResponseDto } from '../dto/DefaultResponseDto';
import AuthService from '../services/authService';

export const useAuthConfirmPasswordByToken = () => {
  const queryClient = useQueryClient();
  const authService = AuthService();
  const toast = useToast();
  const router = useRouter();

  const mutationRequest = React.useCallback(
    async function mutationRequestWrapper(requestData: ConfirmPasswordDto): Promise<DefaultResponseDto> {
      const { token } = router.query;
      if (token) {
        return authService.confirmPasswordByToken(token.toString(), requestData);
      }
      return {
        error: true,
        message: 'Token inválido',
      };
    },
    [authService, router.query]
  );

  const mutationProperties: UseMutationOptions<ConfirmPasswordDto | null, unknown, unknown, unknown> = {
    onSuccess(data) {
      console.log({ data });
      queryClient.invalidateQueries([QUERY_KEYS.ME]);
    },
    onError(error) {
      console.log({ error });
    },
  };

  const { mutateAsync, error, data, isLoading } = useMutation(mutationRequest, mutationProperties);

  const confirmPasswordByToken = React.useCallback(
    async (token: string, requestData: ConfirmPasswordDto) => {
      try {
        const result = await mutateAsync(requestData);

        if (!result?.error) {
          toast({
            title: 'E-mail confirmado com sucesso',
            description: 'Já pode entrar na nossa aplicação <3',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          const time = setTimeout(() => {
            router.replace('/auth/sign-in');
            clearTimeout(time);
          }, 400);
        } else {
          toast({
            title: 'Verifique as informações:',
            description:
              typeof result.message === 'string' ? (
                <Text>{result.message}</Text>
              ) : (
                result.message.map((message, index) => <Text key={index}> - {message};</Text>)
              ),
            status: 'warning',
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Ops...',
          description: 'Tente novamente mais tarde',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [mutateAsync, router, toast]
  );

  return { error, data, isLoading, confirmPasswordByToken };
};
