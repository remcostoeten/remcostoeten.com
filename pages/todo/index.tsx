import React, { useEffect, useState } from 'react';
import { auth, db, GoogleAuthProvider, signInWithPopup } from '@/firebase';
import {
	collection,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	getDocs,
	where,
	query,
} from 'firebase/firestore';
import Header from '../../components/header/Header';
import AddTodo from '../../components/Todo/AddTodo';
import TodoList from '@/components/Todo/TodoList';
import Login from '@/components/Login';
import { Skeleton } from '@mui/material';

interface Todo {
	id: string;
	title: string;
	description: string;
	completed: boolean;
}

export default function IndexPage() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [userName, setUserName] = useState<string | null>(null);

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
		auth.onAuthStateChanged((user) => {
			setIsLoggedIn(Boolean(user));
		});
	}, []);

	useEffect(() => {
		document.body.classList.add('todo-app');
	}, []);
	useEffect(() => {
		const getTodos = async () => {
			setLoading(true);
			try {
				const user = auth.currentUser;
				if (user) {
					const todosSnapshot = await getDocs(
						query(
							collection(db, 'todos'),
							where('userId', '==', user.uid),
						),
					);
					const fetchedTodos = todosSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})) as Todo[];
					setTodos(fetchedTodos);
				} else {
					setTodos([]);
				}
			} catch (error) {
				console.error('Error fetching todos:', error);
			} finally {
				setLoading(false);
			}
		};

		getTodos();
	}, [loading, isLoggedIn]);

	const addNewTodo = async (title: string, description: string) => {
		if (!title.trim() || !description.trim()) {
			return;
		}

		try {
			const user = auth.currentUser;
			if (!user) {
				return;
			}

			const docRef = await addDoc(collection(db, 'todos'), {
				title,
				description,
				completed: false,
				userId: user.uid,
			});
			const newTodo = {
				id: docRef.id,
				title,
				description,
				completed: false,
			};
			setTodos((prevTodos) => [...prevTodos, newTodo]);
		} catch (error) {
			console.error('Error adding todo:', error);
		}
	};

	const toggleComplete = async (id: string) => {
		try {
			const todo = todos.find((todo) => todo.id === id);
			if (!todo) {
				return;
			}

			await updateDoc(doc(db, 'todos', id), {
				completed: !todo.completed,
			});

			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === id
						? { ...todo, completed: !todo.completed }
						: todo,
				),
			);
		} catch (error) {
			console.error('Error updating todo:', error);
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			await deleteDoc(doc(db, 'todos', id));
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error('Error deleting todo:', error);
		}
	};

	const signIn = async () => {
		try {
			await signInWithPopup(auth, new GoogleAuthProvider());
			setIsLoggedIn(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Header />
			<div className='container todo'>
				{isLoggedIn ? (
					<div className='todo'>
						<div className='todo__intro'>
							<div className='text'>
								<h1>
									Welcome back, {}
									{userName}
								</h1>

								<div className='todo__add'>
									<>
										<TodoList
											todos={todos}
											toggleComplete={toggleComplete}
											deleteTodo={deleteTodo}
										/>
									</>
									<>
										{todos.length > 0 ? (
											<>
												<div className='todo__load'>
													load
												</div>
											</>
										) : (
											<>
												{todos.length === 0 && (
													<>
														<p>
															You have no tasks
															left. Time to relax.
															🥳 Or get busy and
															create some new
															ones!
														</p>
													</>
												)}
												{todos.length === 1 && (
													<>
														<p>
															You've got{' '}
															{todos.length} task
															left. Good luck
															nailing it! 🤑
														</p>
													</>
												)}
												{todos.length >= 1 &&
													todos.length <= 4 && (
														<>
															<p>
																You've got{' '}
																{todos.length}{' '}
																task
																{todos.length ===
																1
																	? ''
																	: 's'}{' '}
																left. Better
																start working
																then! 😳
															</p>
														</>
													)}
												{todos.length > 4 && (
													<p>
														You've got{' '}
														{todos.length} task(s)
														left. 😵‍💫 But no
														pressure, I wont judge
														you slacking. 🫣
													</p>
												)}{' '}
											</>
										)}
									</>
								</div>
							</div>
						</div>
						<div className='todo__add'>
							<AddTodo addNewTodo={addNewTodo} />
						</div>
					</div>
				) : (
					<div className='authenticate-please'>
						<h2>
							In order to use the to-do app you need to be logged
							in. <Login />.
						</h2>
					</div>
				)}
			</div>
		</>
	);
}
