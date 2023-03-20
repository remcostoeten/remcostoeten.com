import { useState } from 'react';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from 'react-beautiful-dnd';
import { Task } from '@/types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
					<div className='tasks__lane-title'>
						<h2>
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
						</h2>
					</div>
					<Droppable droppableId={lane.id}>
						{(provided) => (
							<div
								className='tasks__list'
								ref={provided.innerRef}
								{...provided.droppableProps}>
								{tasks
									.filter((task) => task.status === lane.id)
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
													<h3>{task.title}</h3>
													<DeleteForeverIcon
														onClick={() =>
															removeTask(task.id)
														}
													/>
												</div>
											)}
										</Draggable>
									))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			))}
		</DragDropContext>
	);
}
