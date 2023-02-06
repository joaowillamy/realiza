import { AppProps } from 'next/app';
import Head from 'next/head';
import { Theme } from '@realiza/frontend/shared/ui'
import { configYupTranslation } from "@realiza/frontend/shared/form";

configYupTranslation()

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to consumer-frontend!</title>
      </Head>
      <main>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </main>
    </>
  );
}

export default CustomApp;
