import { Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { QUERY_KEYS } from '../constants/querykes';
import { SigninDto } from '../dto/SigninDto';
import { SigninResponseDto } from '../dto/SigninResponseDto';
import { AuthCookiesService } from '../services/authCookiesService';
import AuthService from '../services/authService';

export const useAuthSignin = () => {
  const queryClient = useQueryClient();
  const authService = AuthService();
  const toast = useToast();
  const router = useRouter();
  const authCookiesService = AuthCookiesService();

  const mutationRequest = React.useCallback(
    async function mutationRequestWrapper(
      requestData: SigninDto
    ): Promise<SigninResponseDto> {
      return authService.signin(requestData);
    },
    [authService]
  );

  const mutationProperties: UseMutationOptions<
    SigninResponseDto | null,
    unknown,
    unknown,
    unknown
  > = {
    onSuccess(data) {
      console.log({ data });
      queryClient.invalidateQueries([QUERY_KEYS.ME]);
    },
    onError(error) {
      console.log({ error });
    },
  };

  const { mutateAsync, error, data, isLoading } = useMutation(
    mutationRequest,
    mutationProperties
  );

  const signin = React.useCallback(
    async (requestData: SigninDto) => {
      try {
        const result = await mutateAsync(requestData);
        console.log({ result });

        if (!result?.error && result?.token) {
          await authCookiesService.setTokenCookie(result?.token);

          toast({
            title: 'Entrouuu <3',
            description: 'O sistema está liberado!',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });

          router.replace('/private/premium');
        } else if (result?.message?.length) {
          toast({
            title: 'Verifique as informações:',
            description:
              typeof result.message === 'string' ? (
                <Text>{result.message}</Text>
              ) : (
                result?.message?.map((message, index) => (
                  <Text key={index}> - {message};</Text>
                ))
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
    [authCookiesService, mutateAsync, router, toast]
  );

  return { error, data, isLoading, signin };
};
