import React, { useEffect, useState } from 'react';
import { db, auth } from '@/firebase';
import {
	collection,
	addDoc,
	onSnapshot,
	deleteDoc,
	doc,
	updateDoc,
} from '@firebase/firestore';
import Header from '@/components/header/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '@/components/Login';
import DraggableContainer from '@/components/DraggableContainer';
import { Task } from '@/types';
import TaskModal from '@/components/Task/TaskModal';
import { Button } from '@mui/material';

export default function Index() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState<string | null>(null);
	const [view, setView] = useState<ViewType>('board');
	const [isModalOpen, setIsModalOpen] = useState(false);

	type ViewType = 'board' | 'list';

	const toggleView = () => {
		setView((prevView) => (prevView === 'board' ? 'list' : 'board'));
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
	}, [auth.currentUser]);

	const addTask = async (
		title: string,
		description: string,
		category: string,
	) => {
		const now = new Date();
		const formattedDate = `${now.getDate()}/${
			now.getMonth() + 1
		}/${now.getFullYear()}`;

		const docRef = await addDoc(
			collection(db, `tasks-${auth.currentUser?.uid}`),
			{
				title,
				description,
				category,
				status: 'todo',
				date: formattedDate,
			},
		);
		const newTask = {
			id: docRef.id,
			title,
			description,
			category,
			status: 'todo' as 'todo' | 'inprogress' | 'done',
			date: formattedDate,
		};
		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	const removeTask = async (taskId: string) => {
		try {
			const taskRef = doc(db, `tasks-${auth.currentUser?.uid}`, taskId);
			await deleteDoc(taskRef);
			setTasks((prevTasks) =>
				prevTasks.filter((task) => task.id !== taskId),
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
		setTasks((prevTasks) =>
			prevTasks.map((task) => {
				if (task.id === taskId) {
					return { ...task, ...newTaskData };
				}
				return task;
			}),
		);
	};

	return (
		<>
			<Header />
			{/* <div className='container'><TaskCategories /></div> */}
			<div className='todo'>
				<div className='todo__inner'>
					{/* <Aside /> */}
					<main>
						<div className='todo__header'>
							<h2>
								Welcome back,{' '}
								<span>{auth.currentUser?.displayName} 👋</span>
							</h2>
							<div className='todo__intro'>
								{isLoggedIn ? (
									<>
										<div className='text'>
											{tasks.length === 0 && (
												<>
													<p>
														You have no tasks left.
														Time to relax. 🥳 Or get
														busy and create some new
														ones!
													</p>
												</>
											)}
											{tasks.length === 1 && (
												<>
													<p>
														You've got{' '}
														{tasks.length} task
														left. Good luck nailing
														it! 🤑
													</p>
												</>
											)}
											{tasks.length >= 1 &&
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
									</>
								) : (
									<div className='authenticate-please'>
										<h2>
											In order to use the to-do app you
											need to be logged in. You can{' '}
											<Login /> here.
										</h2>
									</div>
								)}
							</div>
							<div
								className={`toggle-view ${
									view === 'board' ? 'grid' : 'list'
								}`}>
								<div className='view'>
									<button onClick={toggleView}>
										Board view
									</button>
									<button onClick={toggleView}>
										List view
									</button>
								</div>
								<button className='add task'>Add task</button>
							</div>
						</div>
						<div className={`view-container ${view}-view`}>
							{/* Board View */}
							{view === 'board' && (
								<div className='board-view'>
									{/* Board view content */}
								</div>
							)}
							{/* List View */}
							{view === 'list' && (
								<div className='list-view'>
									{/* List view content */}
								</div>
							)}
						</div>
						<div className='tasks'>
							<div className='tasks__lane'>
								<div className='tasks__lane-title'>
									<h2>
										Todo<span>({tasks.length})</span>
									</h2>
									<Button
										variant='outlined'
										color='primary'
										onClick={() => setIsModalOpen(true)}>
										Add new task
									</Button>
									<TaskModal
										isOpen={isModalOpen}
										onClose={() => setIsModalOpen(false)}
										onSubmit={addTask}
									/>
								</div>
								<DraggableContainer
									tasks={tasks.filter(
										(task) => task.status === 'todo',
									)}
									status='todo'
									updateTask={updateTask}
									removeTask={removeTask}
									addTask={addTask}
								/>
								<DraggableContainer
									tasks={tasks.filter(
										(task) => task.status === 'inprogress',
									)}
									status='inprogress'
									updateTask={updateTask}
									removeTask={removeTask}
									addTask={addTask}
								/>

								<DraggableContainer
									tasks={tasks.filter(
										(task) => task.status === 'done',
									)}
									status='done'
									updateTask={updateTask}
									removeTask={removeTask}
									addTask={addTask}
								/>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
