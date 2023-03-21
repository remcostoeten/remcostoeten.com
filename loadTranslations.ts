import fs from 'fs';
import path from 'path';

export const loadTranslations = (locale: string) => {
	const filePath = path.join(
		process.cwd(),
		'public',
		'locales',
		`${locale}.json`,
	);
	const fileContents = fs.readFileSync(filePath, 'utf8');
	return JSON.parse(fileContents);
};
