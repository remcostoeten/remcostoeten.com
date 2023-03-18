import React from 'react';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Description } from '@mui/icons-material';

interface AddTodoProps {
	addNewTodo: (title: string, description: string) => Promise<void>;
}
export default function AddTodo({ addNewTodo }: AddTodoProps) {
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title !== '' && description !== '') {
			await addNewTodo(title, description);
			setTitle('');
			setDescription('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='todo__task-section'>
				<h4>Title task</h4>
				<input
					type='text'
					placeholder='Enter todo title...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className='todo__task-section'>

			<h4>description task</h4>
				<textarea
					placeholder='description...'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<button className='btn btn--ghost'>Add</button>
		</form>
	);
}
