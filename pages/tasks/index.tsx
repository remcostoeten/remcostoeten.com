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
import TaskCategories from '@/components/Todo/TaskCategories';
import { DropResult } from 'react-beautiful-dnd';
import { Task } from '@/types';

<<<<<<< HEAD
=======

type DraggableContainerProps = {
	tasks: Task[];
	updateTask: (taskId: string, newTaskData: Partial<Task>) => void;
};

>>>>>>> 59d7e372a95f4b80c22467a325ef75dd95b2831b
export default function Index() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState<string | null>(null);

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
		const unsubscribe = onSnapshot(
			collection(db, `tasks-${auth.currentUser?.uid}`),
			(snapshot) => {
				setTasks(
					snapshot.docs.map(
						(doc) =>
<<<<<<< HEAD
							({
								id: doc.id,
								...doc.data(),
							} as Task),
					),
=======
						({
							id: doc.id,
							...doc.data(),
						} as Task),
					), 
>>>>>>> 59d7e372a95f4b80c22467a325ef75dd95b2831b
				);
			},
		);
		return () => unsubscribe();
<<<<<<< HEAD
	}, []);
=======
	}, []); 

>>>>>>> 59d7e372a95f4b80c22467a325ef75dd95b2831b

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const title = form.elements.namedItem('title') as HTMLInputElement;
		const description = form.elements.namedItem(
			'description',
		) as HTMLTextAreaElement;
		const category = form.elements.namedItem(
			'category',
		) as HTMLInputElement;
		await addTask(title.value, description.value, category.value);
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

		// Update the tasks in the parent component
		updateTask(reorderedItem.id, { status: reorderedItem.status });
	};

	return (
		<>
			<Header />
			<div className='container'>
				<TaskCategories />
			</div>
			<div className='todo'>
				<div className='container todo__inner'>
					<div className='todo__intro'>
						{isLoggedIn ? (
							<div className='text'>
								<h1>
									Welcome back,{' '}
									<span>{auth.currentUser?.displayName}</span>
									!
								</h1>
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
											You've got {tasks.length} task left.
											Good luck nailing it! 🤑
										</p>
									</>
								)}
								{tasks.length >= 1 && tasks.length <= 4 && (
									<>
										<p>
											You've got {tasks.length} task
											{tasks.length === 1 ? '' : 's'}{' '}
											left. Better start working then! 😳
										</p>
									</>
								)}
								{tasks.length > 4 && (
									<p>
										You've got {tasks.length} task(s) left.
										😵‍💫 But no pressure, I wont judge you
										slacking. 🫣
									</p>
								)}{' '}
								<div className='todo__task-section'>
									<form
										onSubmit={handleSubmit}
										className='todo__add'>
										<label>
											Title:
											<input
												type='text'
												name='title'
												required
											/>
										</label>
										<label>
											Description:
											<textarea
												name='description'
												required
											/>
										</label>
										<label>
											Category:
											<input
												type='text'
												name='category'
												required
											/>
										</label>
										<button type='submit'>Add Task</button>
									</form>
								</div>
							</div>
						) : (
							<div className='authenticate-please'>
								<h2>
									In order to use the to-do app you need to be
									logged in. You can <Login /> here.
								</h2>
							</div>
						)}
					</div>
					<div className='todo__tasks'>
						{tasks.map((task) => (
							<div className='todo__task' key={task.id}>
								<div className='todo__date'>{task.date}</div>
								<DraggableContainer
<<<<<<< HEAD
									tasks={tasks}
=======
									tasks={[task]} // pass an array with the single task object
>>>>>>> 59d7e372a95f4b80c22467a325ef75dd95b2831b
									updateTask={updateTask}
									removeTask={removeTask}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
    </>
  );
}