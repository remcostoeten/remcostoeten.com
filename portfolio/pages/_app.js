import '@/styles/globals.css'

import React from 'react';
import PageTransitionLoader from '@/components/pageTransitionLoader';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PageTransitionLoader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
