import { TodoProps } from './types';

import React from 'react';

export const Row = ({ todo: { task, isCompleted } }: TodoProps) => {
	return (
		<div>
			<p>{task}</p>
			<button aria-label='Delete a todo' onClick={() => null}>
				X
			</button>
			<input
				type='checkbox'
				checked={isCompleted}
				onChange={() => null}
			/>
		</div>
	);
};
