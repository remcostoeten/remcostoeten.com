import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Menu, MenuItem } from '@mui/material';
import { AddCircle, MoreHoriz } from '@mui/icons-material';
import TaskModal from '@/components/Task/TaskModal';
import SubtaskModal from './Subtask/SubtaskModal';
import { Task, Lane } from '@/types';

interface Props {
	lanes: Lane[];
	tasks: Task[];
	addTask: (title: string, description: string, category: string) => void;
	removeTask: (taskId: string) => void;
	updateTask: (taskId: string, newTaskData: Partial<Task>) => void;
	addSubtask: (taskId: string, title: string, description: string) => void;
}

export default function DraggableContainer({
	lanes,
	tasks,
	addTask,
	removeTask,
	updateTask,
	addSubtask,
}: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState<Task | null>(null);
	const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}
		const { source, destination } = result;
		if (source.droppableId === destination.droppableId) {
			const laneTasks = tasks.filter(
				(task) => task.status === source.droppableId,
			);
			const [removedTask] = laneTasks.splice(source.index, 1);
			laneTasks.splice(destination.index, 0, removedTask);
			updateTask(removedTask.id, { status: source.droppableId });
			laneTasks.forEach((task, index) =>
				updateTask(task.id, { order: index }),
			);
			return;
		}

		const sourceTasks = tasks.filter(
			(task) => task.status === source.droppableId,
		);
		const destinationTasks = tasks.filter(
			(task) => task.status === destination.droppableId,
		);
		const [removedTask] = sourceTasks.splice(source.index, 1);
		removedTask.status = destination.droppableId;
		destinationTasks.splice(destination.index, 0, removedTask);

		updateTask(removedTask.id, { status: removedTask.status });

		sourceTasks.forEach((task, index) =>
			updateTask(task.id, { order: index }),
		);
		destinationTasks.forEach((task, index) =>
			updateTask(task.id, { order: index }),
		);
	};

	const openSubtaskModal = (taskId: Task) => {
		setSelectedTaskId(taskId);
		setIsSubtaskModalOpen(true);
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				{lanes &&
					Array.isArray(lanes) &&
					lanes.map((lane) => (
						<div key={lane.id} className='tasks__lane'>
							<div className='tasks__header'>
								<div className='title'>
									{lane.title}{' '}
									<span>
										(
										{
											tasks.filter(
												(task) =>
													task.status === lane.id,
											).length
										}
										)
									</span>
								</div>
								<span className='add'>
									<AddCircle
										onClick={() => setIsModalOpen(true)}
									/>
									Add new task
								</span>
							</div>
							<TaskModal
								isOpen={isModalOpen}
								onClose={() => setIsModalOpen(false)}
								onSubmit={addTask}
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
													(task) =>
														task.status === lane.id,
												)
												.map((task, index) => (
													<Draggable
														key={task.id}
														draggableId={task.id}
														index={index}>
														{(provided) => (
															<div
																className='task'
																ref={
																	provided.innerRef
																}
																{...provided.draggableProps}
																{...provided.dragHandleProps}>
																<div className='tasks__bottom'>
																	{
																		task.category
																	}
																</div>
																<div className='tasks__top'>
																	<span>
																		<h3>
																			{
																				task.title
																			}
																		</h3>
																		<p>
																			{
																				task.description
																			}
																		</p>
																	</span>
																	<div>
																		<span
																			id='basic-button'
																			aria-controls={
																				open
																					? 'basic-menu'
																					: undefined
																			}
																			aria-haspopup='true'
																			aria-expanded={
																				open
																					? 'true'
																					: undefined
																			}
																			onClick={
																				handleClick
																			}>
																			<MoreHoriz />
																		</span>
																		<Menu
																			id='basic-menu'
																			anchorEl={
																				anchorEl
																			}
																			open={
																				open
																			}
																			onClose={
																				handleClose
																			}
																			MenuListProps={{
																				'aria-labelledby':
																					'basic-button',
																			}}>
																			<MenuItem
																				onClick={
																					handleClose
																				}>
																				Profile
																			</MenuItem>
																			<MenuItem
																				onClick={
																					handleClose
																				}>
																				My
																				account
																			</MenuItem>
																			<MenuItem
																				onClick={
																					handleClose
																				}>
																				Logout
																			</MenuItem>
																		</Menu>
																	</div>
																	<DeleteForeverIcon
																		className='remove'
																		onClick={() =>
																			removeTask(
																				task.id,
																			)
																		}
																	/>
																	<button
																		className='add-subtask'
																		onClick={() => {
																			setSelectedTaskId(
																				task,
																			);
																			setIsSubtaskModalOpen(
																				true,
																			);
																		}}>
																		Add
																		subtask
																	</button>
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
			{selectedTaskId && (
				<SubtaskModal
					isOpen={isSubtaskModalOpen}
					onClose={() => setIsSubtaskModalOpen(false)}
					onSubmit={(title, description) =>
						addSubtask(selectedTaskId.id, title, description)
					}
					subtasks={[]}
				/>
			)}
		</>
	);
}
