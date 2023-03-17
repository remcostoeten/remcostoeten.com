	import { DeleteOutline } from '@mui/icons-material';
	import React from 'react';
	interface Todo {
	id: string;
	title: string;
	completed: boolean;
	}
	interface TodoListProps {
	todos: Todo[];
	toggleComplete: (id: string) => Promise<void>;
	deleteTodo: (id: string) => Promise<void>;
	}

	const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, deleteTodo }) => {
	return (
		<ul>
		{todos.map((todo) => (
			<li key={todo.id}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => toggleComplete(todo.id)}
			/>
			<span style={{ textDecoration: todo.completed ? 'line-through' : undefined }}>
				{todo.title}
			</span>
			<button onClick={() => deleteTodo(todo.id)}><DeleteOutline/></button>
			</li>
		))}
		</ul>
	);
	};

	export default TodoList;
