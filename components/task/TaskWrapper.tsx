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
import DraggableContainer from './DraggableContainer';
import TaskModal from '@/components/task/TaskModal';

export default function TaskWrapper() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [userName, setUserName] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [view, setView] = useState('board');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [editedTask, setEditedTask] = useState<Task | null>(null);

	const openEditModal = (task: Task) => {
		setEditedTask(task);
		setIsModalOpen(true);
	};
	type ViewType = 'board' | 'list';
	interface Task {
		id: string;
		title: string;
		description: string;
		category: string;
		status: 'todo' | 'inprogress' | 'done';
		date: string;
	}
	const toggleView = () => {
		setView(view === 'board' ? 'list' : 'board');
	};
	useEffect(() => {
		document.body.classList.add('white-theme');
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

	const removeTask = async (taskId: string) => {
		try {
			const taskRef = doc(db, `tasks-${auth.currentUser?.uid}`, taskId);
			await deleteDoc(taskRef);
			setTasks((prevTasks: Task[]) =>
				prevTasks.filter((task: Task) => task.id !== taskId),
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
		setTasks((prevTasks: Task[]) =>
			prevTasks.map((task: Task) => {
				if (task.id === taskId) {
					return { ...task, ...newTaskData };
				}
				return task;
			}),
		);
	};

	return (
		<>
			<div className='bg-gray-100 h-screen flex items-baseline pt-4 justify-center'>
				<div className='todo todo-wrapper w-full max-w-5xl p-6 rounded-xl bg-white shadow-md'>
					<div className='todo__inner'>
						<main>
							<div className='todo__header flex flex-col mb-2'>
								<h2 className='text-xl font-semibold'>
									Welcome back,{' '}
									<span className='text-blue-500'>
										{auth.currentUser?.displayName} 👋
									</span>
								</h2>
								<div className='todo__intro'>
									<div className='text'>
										{tasks.length === 0 && (
											<>
												<p>
													You have no tasks left. Time
													to relax. 🥳 Or get busy and
													create some new ones!
												</p>
											</>
										)}
										{tasks.length === 1 && (
											<>
												<p>
													You've got {tasks.length}{' '}
													task left. Good luck nailing
													it! 🤑
												</p>
											</>
										)}
										{tasks.length >= 2 &&
											tasks.length <= 4 && (
												<>
													<p>
														You've got{' '}
														{tasks.length} task
														{tasks.length === 1
															? ''
															: 's'}{' '}
														left. Better start
														working then! 😳
													</p>
												</>
											)}
										{tasks.length > 4 && (
											<p>
												You've got {tasks.length}{' '}
												task(s) left. 😵‍💫 But no
												pressure, I wont judge you
												slacking. 🫣
											</p>
										)}
									</div>
								</div>
								<div className='toggle-view flex space-x-4'>
									<button
										className='board-view text-black bg-blue-500 font-semibold py-2 px-4 rounded-md'
										onClick={toggleView}>
										Board view
									</button>
									<button
										className='list-view bg-blue-500 text-black font-semibold py-2 px-4 rounded-md'
										onClick={toggleView}>
										List view
									</button>
									<button
										className='btn btn--primary'
										onClick={() => setIsModalOpen(true)}
										disabled={!isLoggedIn}>
										Add task
									</button>
								</div>
							</div>
							<TaskModal
								isOpen={isModalOpen}
								onClose={() => {
									setIsModalOpen(false);
									setEditedTask(null);
								}}
								onSubmit={addTask}
								editedTask={editedTask}
							/>

							<div className={`view-container ${view}-view`}>
								{/* Board View */}
								{view === 'board' && (
									<div className='tasks'>
										<DraggableContainer
											tasks={tasks}
											updateTask={updateTask}
											removeTask={removeTask}
										/>
									</div>
								)}
								{/* List View */}
								{view === 'list' && (
									<div className='list-view'>
										{/* List view content */}
									</div>
								)}
							</div>
						</main>
					</div>
				</div>
			</div>
			;
		</>
	);
}
