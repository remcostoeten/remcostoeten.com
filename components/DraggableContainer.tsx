import { useState } from 'react';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from 'react-beautiful-dnd';
import { Task } from '@/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type DraggableContainerProps = {
	tasks: Task[];
	updateTask: (taskId: string, newTaskData: Partial<Task>) => void;
	removeTask: (taskId: string) => void;
};

const DraggableContainer = ({
	tasks,
	updateTask,
	removeTask,
}: DraggableContainerProps) => {
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(tasks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		// Update the status of the task based on the droppableId of the destination
		reorderedItem.status = result.destination.droppableId as
			| 'todo'
			| 'inProgress'
			| 'done';

		// Update the tasks in the parent component
		updateTask(reorderedItem.id, { status: reorderedItem.status });
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className='tasks'>
				<ToastContainer autoClose={false} />

				<Droppable droppableId='todo'>
					{(provided) => (
						<div
							className='tasks__lane'
							ref={provided.innerRef}
							{...provided.droppableProps}>
							<h2 className='tasks__lane-title'>Todo</h2>

							{tasks
								.filter((task) => task.status === 'todo')
								.map((task, index) => (
									<Draggable
										key={task.id}
										draggableId={task.id}
										index={index}>
										{(provided) => (
											<div
												className='tasks__task'
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<h2 className='title'>
													{task.title}
												</h2>
												<p className='description'>
													{task.description}
												</p>
												<span className='category'>
													{task.category}
												</span>
												<button
													onClick={() =>
														updateTask(task.id, {
															status: 'deleted',
														})
													}>
													Remove
												</button>
											</div>
										)}
									</Draggable>
								))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>

				<Droppable droppableId='inProgress'>
					{(provided) => (
						<div
							className='tasks__lane'
							ref={provided.innerRef}
							{...provided.droppableProps}>
							<h2 className='tasks__lane-title'>In Progress</h2>

							{tasks
								.filter((task) => task.status === 'inProgress')
								.map((task, index) => (
									<Draggable
										key={task.id}
										draggableId={task.id}
										index={index}>
										{(provided) => (
											<div
												className='tasks__task'
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<h2 className='title'>
													{task.title}
												</h2>
												<p className='description'>
													{task.description}
												</p>
												<span className='category'>
													{task.category}
												</span>
												<button
													onClick={() =>
														updateTask(task.id, {
															status: 'deleted',
														})
													}>
													Remove
												</button>
											</div>
										)}
									</Draggable>
								))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>

				<Droppable droppableId='done'>
					{(provided) => (
						<div
							className='tasks__lane'
							ref={provided.innerRef}
							{...provided.droppableProps}>
							<h2 className='tasks__lane-title'>Done</h2>

							{tasks
								.filter((task) => task.status === 'done')
								.map((task, index) => (
									<Draggable
										key={task.id}
										draggableId={task.id}
										index={index}>
										{(provided) => (
											<div
												className='tasks__task'
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<h2 className='title'>
													{task.title}
												</h2>
												<p className='description'>
													{task.description}
												</p>
												<span className='category'>
													{task.category}
												</span>
												<button
													onClick={() =>
														removeTask(task.id)
													}>
													Remove
												</button>
											</div>
										)}
									</Draggable>
								))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
};

export default DraggableContainer;
