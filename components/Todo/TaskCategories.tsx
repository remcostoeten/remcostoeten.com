import React from 'react';
import { useLocale } from '../LocaleContext';

export default function TaskCategories() {
	const { locale, setLocale, t } = useLocale();
	const categories = [
		t('app.todo'),
		t('app.inprogress'),
		t('app.onhold'),
		t('app.done'),
	];

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setLocale(event.target.value);
	};

	return (
		<>
			<label htmlFor='language-select'>Language:</label>
			<select id='language-select' value={locale} onChange={handleChange}>
				<option value='en'>English</option>
				<option value='nl'>Dutch</option>
				<option value='fries'>Frisian</option>
			</select>
			<header className='categories'>
				{categories.map((category) => (
					<div className='categories__category'>{category}</div>
				))}
			</header>
		</>
	);
}
