import { createContext, useContext, useState } from 'react';
import en from '../public/locales/en.json';
import nl from '../public/locales/nl.json';
import fries from '../public/locales/fries.json';

interface LocaleContext {
	locale: string;
	setLocale: (locale: string) => void;
	t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContext | undefined>(undefined);

export const useLocale = () => {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error('useLocale must be used within a LocaleProvider');
	}
	return context;
};

interface LocaleProviderProps {
	children: React.ReactNode;
}

interface Translations {
	[key: string]: {
		[key: string]: string;
	};
}

const translations: Translations = {
	en,
	nl,
	fries,
};

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
	const [locale, setLocale] = useState('en');

	const t = (key: string) => translations[locale][key] || key;

	return (
		<LocaleContext.Provider value={{ locale, setLocale, t }}>
			{children}
		</LocaleContext.Provider>
	);
};
