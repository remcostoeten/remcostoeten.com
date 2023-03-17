import { DeleteOutline } from '@mui/icons-material';
import React from 'react';
interface Todo {
	id: string;
	title: string;
	description: string;
	completed: boolean;
}
interface TodoListProps {
	todos: Todo[];
	toggleComplete: (id: string) => Promise<void>;
	deleteTodo: (id: string) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({
	todos,
	toggleComplete,
	deleteTodo,
}) => {
	return (
		<div className='todos'>
			{todos.map((todo) => (
				<div className='todos__todo' key={todo.id}>
					<input
						type='checkbox'
						checked={todo.completed}
						onChange={() => toggleComplete(todo.id)}
					/>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							textDecoration: todo.completed
								? 'line-through'
								: undefined,
						}}>
						<span>{todo.title}</span>
						<span>{todo.description}</span>
					</div>
					<button onClick={() => deleteTodo(todo.id)}>
						<DeleteOutline />
					</button>
				</div>
			))}
		</div>
	);
};

export default TodoList;
