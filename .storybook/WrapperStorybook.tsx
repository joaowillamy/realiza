import { Theme } from './theme';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const WrapperStorybook = ({ children }: { children: React.ReactNode }) => {
  const queryClient: QueryClient = React.useMemo(function configWrapper() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 10 * 60 * 1000,
          refetchOnWindowFocus: false,
          retry: false,
          retryDelay: 3000,
          staleTime: 1 * 60 * 1000,
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Theme>{children}</Theme>
    </QueryClientProvider>
  );
};
