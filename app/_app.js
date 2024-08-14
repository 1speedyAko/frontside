import './globals.css';
import { Roboto } from '@next/font/google';
import Head from 'next/head';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['500', '700'],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Cryptomus domain verification meta tag */}
        <meta name="cryptomus" content="fea1d58b" />
      </Head>
      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export { roboto };
export default MyApp;
