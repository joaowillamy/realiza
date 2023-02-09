import { useToast } from '@chakra-ui/react';
import { configYupTranslation } from '@realiza/frontend/shared/form';
import { Theme } from '@realiza/frontend/shared/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

configYupTranslation();

function CustomApp({ Component, pageProps }: AppProps) {
  const toast = useToast();
  const router = useRouter();
  const messageError = router.query['message-error'];
  const messageInfo = router.query['message-info'];

  useEffect(() => {
    if (!messageError) return;

    toast({
      title: 'Ops...',
      description: messageError,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
    router.replace(router.pathname);
  }, [toast, messageError, router]);

  useEffect(() => {
    if (!messageInfo) return;

    toast({
      title: 'Só informando:',
      description: messageInfo,
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
    router.replace(router.pathname);
  }, [toast, messageInfo, router]);

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
