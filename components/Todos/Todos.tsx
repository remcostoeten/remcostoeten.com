// www.youtube.com/watch?v=zx_879gAoYo
import React, { useState } from 'react';
import { Row } from './Row';
import { Data } from './todos';
import { Todo } from './types';
export const Todos = () => {
	const [todos, setTodos] = useState<Todo[]>(Data);
	const [task, setTask] = useState('');
	const todosLength = todos.length;
	const hasTodos = todos.length > 0;
	const remainingTodos = todos.filter(
		(todo: { isCompleted: any }) => !todo.isCompleted,
	).length;

	return (
		<>
			<section>
				{todos.map(
					(todo: {
						id: any;
						task?: string;
						isCompleted?: boolean;
					}) => (
						<Row
							key={todo.id}
							todo={{
								id: '',
								task: '',
								isCompleted: false,
							}}
							handleCheckTodo={function (id: string): void {
								throw new Error('Function not implemented.');
							}}
							handleDeleteTodo={function (id: string): void {
								throw new Error('Function not implemented.');
							}}
						/>
					),
				)}
			</section>
		</>
	);
};
