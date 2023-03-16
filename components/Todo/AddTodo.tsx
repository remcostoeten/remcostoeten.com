import React, { useState } from 'react';
import { db } from '@/firebase';
import { CollectionReference, addDoc, collection } from '@firebase/firestore';

export default function AddTodo() {
	const [title, setTitle] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (title !== '') {
			await addDoc(collection(db, 'todos'), {
				title,
				completed: false,
			});
		}
	};

	return (
		<form className='todo' onSubmit={handleSubmit}>
			<div className='todo__container'>
				<input
					type='text'
					placeholder='Enter todo..'
					value={title}
					onChange={(e) => setTitle(e.target.value)}></input>
			</div>
		</form>
	);
}
