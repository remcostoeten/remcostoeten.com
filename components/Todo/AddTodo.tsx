import { db } from '@/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { CheckCircleIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import AddTodo from './Todo';

import React from 'react';
interface TodoItem {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
}

interface TodoProps {
	todo: TodoItem;
	toggleComplete: (id: string) => void;
	handleDelete: (id: string) => void;
	handleEdit: (id: string, title: string, description: string) => void;
}

const handleEdit = async (
	todo: TodoItem,
	newTitle: string,
	newDescription: string,
): Promise<void> => {
	const todoRef = doc(db, 'todos', todo.id);
	await updateDoc(todoRef, {
		title: newTitle,
		description: newDescription,
	});
};

export default function Todo({
	todo,
	toggleComplete,
	handleDelete,
	handleEdit,
}: TodoProps) {
	const [newTitle, setNewTitle] = React.useState(todo?.title || '');
	const [newDescription, setNewDescription] = React.useState(
		todo?.description || '',
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (todo?.completed === true) {
			setNewTitle(todo.title || '');
			setNewDescription(todo.description || '');
		} else {
			setNewTitle(e.target.value);
			setNewDescription('');
		}
	};

	return (
		<div className='todo'>
			<input
				style={{
					textDecorationLine: todo?.completed
						? 'line-through'
						: undefined,
				}}
				type='text'
				value={newTitle}
				className='list'
				onChange={handleChange}
			/>
			<input
				type='text'
				value={newDescription}
				className='list'
				onChange={(e) => setNewDescription(e.target.value)}
			/>
			<div>
				<button
					className='button-complete'
					onClick={() => toggleComplete(todo.id)}></button>
				<button
					className='button-edit'
					onClick={() =>
						handleEdit(todo.id, newTitle, newDescription)
					}></button>
				<button
					className='button-delete'
					onClick={() => handleDelete(todo.id)}></button>
			</div>
		</div>
	);
}
