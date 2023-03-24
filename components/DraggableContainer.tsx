import { useState } from 'react';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from 'react-beautiful-dnd';
import { Task } from '@/types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AddCircle } from '@mui/icons-material';
import TaskModal from './Task/TaskModal';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import { useAuth } from './useAuth';

interface DraggableContainerProps {
	tasks: Task[];
	updateTask: (taskId: string, newTaskData: Partial<Task>) => Promise<void>;
	removeTask: (taskId: string) => void;
}

export default function DraggableContainer({
	tasks,
	updateTask,
	removeTask,
}: DraggableContainerProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const addTask = async (
		title: string,
		description: string,
		category: string,
	) => {
		const now = new Date();
		const formattedDate = `${now.getDate()}/${
			now.getMonth() + 1
		}/${now.getFullYear()}`;

		await addDoc(collection(db, `tasks-${auth.currentUser?.uid}`), {
			title,
			description,
			category,
			status: 'todo',
			date: formattedDate,
		});
	};

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(tasks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		reorderedItem.status = result.destination.droppableId as
			| 'todo'
			| 'inprogress'
			| 'done';
		updateTask(reorderedItem.id, { status: reorderedItem.status });
	};

	const lanes = [
		{ id: 'todo', title: 'To Do' },
		{ id: 'inprogress', title: 'In Progress' },
		{ id: 'done', title: 'Done' },
	];

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			{lanes.map((lane) => (
				<div key={lane.id} className='tasks__lane'>
					<div className='tasks__header'>
						<div className='title'>
							{lane.title}{' '}
							<span>
								(
								{
									tasks.filter(
										(task) => task.status === lane.id,
									).length
								}
								)
							</span>
						</div>
						<span className='add'>
							<AddCircle onClick={() => setIsModalOpen(true)} />
							Add new task
						</span>
					</div>
					<TaskModal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						onSubmit={addTask} // Make sure this is correctly bound
					/>
					<div className='inner'>
						<Droppable droppableId={lane.id}>
							{(provided) => (
								<div
									className='tasks__list'
									ref={provided.innerRef}
									{...provided.droppableProps}>
									{tasks
										.filter(
											(task) => task.status === lane.id,
										)
										.map((task, index) => (
											<Draggable
												key={task.id}
												draggableId={task.id}
												index={index}>
												{(provided) => (
													<div
														className='task'
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}>
														<DeleteForeverIcon
															className='remove'
															onClick={() =>
																removeTask(
																	task.id,
																)
															}
														/>
														<div className='tasks__bottom'>
															{task.category}
														</div>
														<div className='tasks__top'>
															<h3>
																{task.title}
															</h3>
															<p>
																{
																	task.description
																}
															</p>
														</div>
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</div>
			))}
		</DragDropContext>
	);
}
