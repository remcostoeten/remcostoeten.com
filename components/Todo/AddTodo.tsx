import React from 'react';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddTodo() {
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title !== '') {
			await addDoc(collection(db, 'todos'), {
				title,
				description, // include the description in the document data
				completed: false,
			});
			setTitle('');
			setDescription('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='input_container'>
				<input
					type='text'
					placeholder='Enter todo title...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Enter todo description...'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className='btn_container'>
				<button>Add</button>
			</div>
		</form>
	);
}
