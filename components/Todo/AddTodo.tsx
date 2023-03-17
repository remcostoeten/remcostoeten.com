import React from 'react';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface AddTodoProps {
	addNewTodo: (title: string) => Promise<void>;
}

export default function AddTodo({ addNewTodo }: AddTodoProps) {
	const [title, setTitle] = React.useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title !== '') {
			await addNewTodo(title);
			setTitle('');
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
			</div>
			<div className='btn_container'>
				<button>Add</button>
			</div>
		</form>
	);
}
