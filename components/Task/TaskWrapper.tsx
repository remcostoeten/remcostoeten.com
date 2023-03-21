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
import Header from '@/components/Header/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '@/components/Login';
import DraggableContainer from '@/components/DraggableContainer';
import TaskModal from '@/components/Task/TaskModal';
import { AddCircle } from '@mui/icons-material';
import Aside from '@/components/Task/AsideSmall';
import { signIn, signOut } from '@/utils/LoginLogic';
import Modal from '../Modal';

export default function TaskWrapper() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [userName, setUserName] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [view, setView] = useState('board');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
			setTasks((prevTasks) =>
				prevTasks.filter((task) => task.id !== taskId),
			);
			toast.success('Task emoved successfully');
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
					<Aside view={view} isLoggedIn={isLoggedIn} />
					<main>
						<div className='todo__header'>
							<h2>
								Welcome back,{' '}
								<span>{auth.currentUser?.displayName} 👋</span>
							</h2>
							<div className='todo__intro'>
								<div className='text'>
									{tasks.length === 0 && (
										<>
											<p>
												You have no tasks left. Time to
												relax. 🥳 Or get busy and create
												some new ones!
											</p>
										</>
									)}
									{tasks.length === 1 && (
										<>
											<p>
												You've got {tasks.length} task
												left. Good luck nailing it! 🤑
											</p>
										</>
									)}
									{tasks.length >= 1 && tasks.length <= 4 && (
										<>
											<p>
												You've got {tasks.length} task
												{tasks.length === 1
													? ''
													: 's'}{' '}
												left. Better start working then!
												😳
											</p>
										</>
									)}
									{tasks.length > 4 && (
										<p>
											You've got {tasks.length} task(s)
											left. 😵‍💫 But no pressure, I wont
											judge you slacking. 🫣
										</p>
									)}
								</div>
							</div>
							<div
								className={`toggle-view ${
									view === 'board' ? 'grid' : 'list'
								}`}>
								<div className='view'>
									<button
										className='board-view'
										onClick={toggleView}>
										Board view
									</button>
									<button
										className='list-view'
										onClick={toggleView}>
										List view
									</button>
								</div>
								<button
									className='add task'
									onClick={() => setIsModalOpen(true)}
									disabled={!isLoggedIn}>
									Add task
								</button>
							</div>
						</div>
						<span className='add'>
							<AddCircle onClick={() => setIsModalOpen(true)} />
							Add new task
						</span>

						<TaskModal
							isOpen={isModalOpen}
							onClose={() => setIsModalOpen(false)}
							onSubmit={addTask}
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
		</>
	);
}
