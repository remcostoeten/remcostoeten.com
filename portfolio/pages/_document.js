import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Hello i am remco from ...🔥</title>
          <meta
            name='description'
            content='Remco Stoeten, front-end developer with six years experience aspiring to be more than just a so called "divjesschuiver".'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
