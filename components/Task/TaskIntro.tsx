import { Task } from '@/types';
import React from 'react';

interface TodoIntroProps {
	tasks: Task[];
}

const TodoIntro = ({ tasks }: TodoIntroProps) => {
	return (
		<div className='todo__intro'>
			<div className='text'>
				{tasks.length === 0 && (
					<>
						<p>
							You have no tasks left. Time to relax.🥳 Or get busy
							and create some new ones!
						</p>
					</>
				)}
				{tasks.length === 1 && (
					<>
						<p>
							You've got {tasks.length} task left. Good luck
							nailing it! 🤑
						</p>
					</>
				)}
				{tasks.length >= 1 && tasks.length <= 4 && (
					<>
						<p>
							You've got {tasks.length} task
							{tasks.length === 1 ? '' : 's'} left. Better start
							working then! 😳
						</p>
					</>
				)}
				{tasks.length > 4 && (
					<p>
						You've got {tasks.length} task(s) left. 😵‍💫 But no
						pressure, I wont judge you slacking.🫣
					</p>
				)}
			</div>
		</div>
	);
};

export default TodoIntro;
