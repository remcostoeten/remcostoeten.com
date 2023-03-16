import React from 'react';

export interface TodoItem {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
}

export interface TodoProps {
	todo: TodoItem;
	toggleComplete: (todo: TodoItem) => Promise<void>;
	handleDelete: (id: string) => Promise<void>;
}

export default function Todo({
	todo,
	toggleComplete,
	handleDelete,
}: TodoProps) {
	const [title, setTitle] = React.useState(todo.title);
	const [description, setDescription] = React.useState('');

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleDescriptionChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setDescription(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await toggleComplete(todo);
	};

	const handleDeleteClick = async () => {
		await handleDelete(todo.id);
	};

	return (
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
			<form onSubmit={handleSubmit}>
				<button type='submit'>Complete</button>
			</form>
			<button onClick={handleDeleteClick}>Delete</button>
			<input
				type='text'
				value={description}
				onChange={handleDescriptionChange}
			/>
		</div>
	);
}
