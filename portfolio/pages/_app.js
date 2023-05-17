import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/header/Header";
import "@/styles/styles.css";

import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CustomCursor />
      <Header/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
