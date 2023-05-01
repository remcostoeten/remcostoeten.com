import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta
						name='description'
						content='Remco Stoeten, front-end developer with six years experience aspiring to be more than just a so called "divjesschuiver"..'
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
