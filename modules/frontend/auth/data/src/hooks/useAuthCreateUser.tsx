import { CreateUserDto } from '../dto/createUserDto'
import AuthService from '../services/authService'
import { UseMutationOptions, useMutation, useQueryClient } from 'react-query';
import { CreateUserResponseDto } from '../dto/createUserResponseDto';
import React from 'react';
import { QUERY_KEYS } from '../constants/querykes';
import { useToast, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router'

export const useAuthCreateUser = () => {
  const queryClient = useQueryClient();
  const authService = AuthService();
  const toast = useToast();
  const router = useRouter()

  const mutationRequest = React.useCallback(
    async function mutationRequestWrapper(requestData: CreateUserDto): Promise<CreateUserResponseDto> {
      return authService.createUser(requestData)
    },
    [authService]
  );

  const mutationProperties: UseMutationOptions<CreateUserResponseDto | null, unknown, unknown, unknown> = {
    onSuccess(data) {
      console.log({data})
      queryClient.invalidateQueries([QUERY_KEYS.ME]);
    },
    onError(error) {
      console.log({error})
    }
  };

  const { mutateAsync, error, data, isLoading } = useMutation(mutationRequest, mutationProperties)

  const createUser =  React.useCallback(async (requestData: CreateUserDto) => {
    try {
      const result = await mutateAsync(requestData);

      if (!result?.error) {
        toast({
          title: 'Conta criada com sucesso',
          description: "Verifique seu email",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.replace('/auth/confirme-email/false')
      } else {
        toast({
          title: 'Verifique as informações:',
          description: typeof result.message === 'string' ? <Text>{result.message}</Text> : result.message.map((message, index) => <Text key={index}> - {message};</Text>),
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
        toast({
          title: 'Ops...',
          description: 'Tente novamente mais tarde',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
    }
  }, [mutateAsync, router, toast])

  return {error, data, isLoading, createUser}
}
