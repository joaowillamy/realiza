import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { QUERY_KEYS } from '../constants/querykes';
import { AuthCookiesService } from '../services/authCookiesService';

export const useAuthLogout = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();
  const authCookiesService = AuthCookiesService();

  const mutationRequest = React.useCallback(
    async function mutationRequestWrapper(): Promise<void> {
      return authCookiesService.deleteCookieClient();
    },
    [authCookiesService]
  );

  const mutationProperties: UseMutationOptions<void, void, void, unknown> = {
    onSuccess(data) {
      console.log({ data });
      queryClient.invalidateQueries([QUERY_KEYS.ME]);
    },
    onError(error) {
      console.log({ error });
    },
  };

  const { mutateAsync, error, isLoading } = useMutation(mutationRequest, mutationProperties);

  const logout = React.useCallback(async () => {
    try {
      await mutateAsync();
      toast({
        title: 'Tchauuuu',
        description: 'Volte sempre! <3',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      router.replace('/');
    } catch (error) {
      toast({
        title: 'Ops...',
        description: 'Tente novamente mais tarde',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [mutateAsync, router, toast]);

  return { error, isLoading, logout };
};
