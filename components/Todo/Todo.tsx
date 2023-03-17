import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export interface TodoProps {
	todo: {
		title: string;
		completed: boolean;
		id: string;
	};
	toggleComplete: (todo: TodoProps['todo']) => void;
	handleDelete: (id: string) => void;
	handleEdit: (todo: TodoProps['todo'], newTitle: string) => void;
}
export default function Todo({
	todo,
	toggleComplete,
	handleDelete,
	handleEdit,
}: TodoProps) {
	const [newTitle, setNewTitle] = React.useState(todo.title);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (todo.completed === true) {
			setNewTitle(todo.title);
		} else {
			todo.title = '';
			setNewTitle(e.target.value);
		}
	};
	return (
		<div className='todo'>
			<input
				style={{
					textDecorationLine: todo.completed
						? 'line-through'
						: undefined,
				}}
				type='text'
				value={todo.title === '' ? newTitle : todo.title}
				className='list'
				onChange={handleChange}
			/>
			<div>
				<button
					className='button-complete'
					onClick={() => toggleComplete(todo)}>
					<CheckCircleIcon id='i' />
				</button>
				<button
					className='button-edit'
					onClick={() => handleEdit(todo, newTitle)}>
					<EditIcon id='i' />
				</button>
				<button
					className='button-delete'
					onClick={() => handleDelete(todo.id)}>
					<DeleteIcon id='i' />
				</button>
			</div>
		</div>
	);
}
