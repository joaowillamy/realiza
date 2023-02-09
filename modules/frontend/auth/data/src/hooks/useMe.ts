import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { QUERY_KEYS } from '../constants/querykes';
import { MeDto } from '../dto/meDto';
import { MeResponseDto } from '../dto/meResponseDto';
import AuthService from '../services/authService';

interface UseMe {
  me?: MeDto;
  updateUser: (user: MeResponseDto) => void;
  clearUser: () => void;
  error: unknown;
  isLoading: boolean;
  meRefetch: () => Promise<void>;
}

export function useMe(): UseMe {
  const queryClient = useQueryClient();
  const authService = AuthService();

  const { data, error, refetch } = useQuery<MeResponseDto>(
    QUERY_KEYS.ME,
    () => authService.me(),
    {
      initialData: { error: false, message: '' },
      onSuccess: (received: null | MeResponseDto) => {
        console.log('useMe.onSuccess', { received });
        // TODO: save in store
      },
    }
  );

  function updateUser(newUser: MeResponseDto): void {
    queryClient.setQueryData(QUERY_KEYS.ME, newUser);
  }

  function clearUser() {
    queryClient.setQueryData(QUERY_KEYS.ME, null);
  }

  const meRefetch = React.useCallback(async () => {
    await refetch();
  }, [refetch]);

  const isLoading = React.useMemo<boolean>(() => {
    return !data?.me?.id?.length;
  }, [data?.me?.id]);

  return { me: data?.me, updateUser, clearUser, error, isLoading, meRefetch };
}
