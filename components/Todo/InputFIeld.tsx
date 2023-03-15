import { useState } from 'react';
import { db } from '@/utils/firebasetodo';

type Props = {
	onSave: (text: string) => void;
};

const InputField = ({ onSave }: Props) => {
	const [inputText, setInputText] = useState<string>('');

	const handleSaveClick = () => {
		db.collection('texts')
			.add({ text: inputText })
			.then((docRef: { id: any }) => {
				onSave(inputText);
				console.log('Document written with ID: ', docRef.id);
			})
			.catch((error: any) => {
				console.error('Error adding document: ', error);
			});
	};

	return (
		<div>
			<input
				type='text'
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
			/>
			<button onClick={handleSaveClick}>Save</button>
		</div>
	);
};

export default InputField;
