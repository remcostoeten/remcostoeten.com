import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/header/Header";
import "@/styles/styles.css";

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase'; // Make sure the path is correct


import React, { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <CustomCursor />
      <Header/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
