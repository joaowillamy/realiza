import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React from 'react';

import { Theme } from '@realiza/frontend/shared/ui'
import { configYupTranslation } from "@realiza/frontend/shared/form";

configYupTranslation()

function CustomApp({ Component, pageProps }: AppProps) {

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
    <>
      <Head>
        <title>Welcome to consumer-frontend!</title>
      </Head>
      <main>
        <Theme>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Component {...pageProps} />
          </QueryClientProvider>
        </Theme>
      </main>
    </>
  );
}

export default CustomApp;
