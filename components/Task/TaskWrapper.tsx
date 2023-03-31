import React, { useEffect, useState } from 'react';
import { db, auth } from '@/utils/firebase';
import {
	collection,
	addDoc,
	onSnapshot,
	deleteDoc,
	doc,
	updateDoc,
} from '@firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskModal from '@/components/Task/TaskModal';
import { AddCircle, MoreHoriz } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SubtaskModal from '../Subtask/SubtaskModal';

type ViewType = 'board' | 'list';

interface Task {
	id: string;
	title: string;
	description: string;
	category: string;
	status: 'todo' | 'inprogress' | 'done';
	date: string;
	subtasks: string[];
}

export default function TaskWrapper() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [userName, setUserName] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [view, setView] = useState<ViewType>('board');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const toggleView = () => {
		setView(view === 'board' ? 'list' : 'board');
	};

	useEffect(() => {
		document.body.classList.add('dark-theme');
	}, []);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserName(user.displayName);
			} else {
				setIsLoggedIn(false);
				setUserName(null);
			}
		});
	}, []);

	useEffect(() => {
		if (auth.currentUser) {
			const unsubscribe = onSnapshot(
				collection(db, `tasks-${auth.currentUser?.uid}`),
				(snapshot) => {
					setTasks(
						snapshot.docs.map(
							(doc) =>
								({
									id: doc.id,
									...doc.data(),
								} as Task),
						),
					);
				},
			);
			return () => unsubscribe();
		}
	}, []);

	const addTask = async (
		title: string,
		description: string,
		category: string,
	) => {
		const now = new Date();
		const formattedDate = now.toLocaleDateString(undefined, {
			day: 'numeric',
			month: 'short',
		});

		await addDoc(collection(db, `tasks-${auth.currentUser?.uid}`), {
			title,
			description,
			category,
			status: 'todo',
			date: formattedDate,
			subtasks: [],
		});
	};

	const removeTask = async (taskId: string) => {
		try {
			const taskRef = doc(db, `tasks-${auth.currentUser?.uid}`, taskId);
			await deleteDoc(taskRef);
			setTasks((prevTasks: any[]) =>
				prevTasks.filter((task: { id: string }) => task.id !== taskId),
			);
			toast.success('Task removed successfully');
		} catch (error) {
			console.error('Error removing task:', error);
		}
	};

	const updateTask = async (taskId: string, newTaskData: Partial<Task>) => {
		await updateDoc(
			doc(db, `tasks-${auth.currentUser?.uid}`, taskId),
			newTaskData,
		);
		setTasks((prevTasks: any[]) =>
			prevTasks.map((task: { id: string }) => {
				if (task.id === taskId) {
					return { ...task, ...newTaskData };
				}
				return task;
			}),
		);
	};

	const handleDragEnd = (result: any) => {
		// Add your drag and drop logic here
	};

	const lanes = [
		{ id: 'todo', title: 'To Do' },
		{ id: 'inprogress', title: 'In Progress' },
		{ id: 'done', title: 'Done' },
	];

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [selectedTaskId, setSelectedTaskId] = useState<Task | null>(null);
	const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);

	const addSubtask = (taskId: string, title: string, description: string) => {
		// Add subtask logic here
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
																<div className='tasks__top'>
																	<span>
																		<h3>
																			{
																				task.title
																			}
																		</h3>
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
																		</div>{' '}
																	</span>
																	<p>
																		{
																			task.description
																		}
																	</p>
																</div>
																<div className='tasks__actions'>
																	<span className='tasks__date'>
																		{
																			task.date
																		}
																	</span>
																	<DeleteForeverIcon
																		className='remove'
																		onClick={() =>
																			removeTask(
																				task.id,
																			)
																		}
																	/>
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
