import React, { useEffect, useState } from 'react';
import { db } from '@/firebase';
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

interface Todo {
	id: string;
	title: string;
	description: string;
	completed: boolean;
}

export default function IndexPage() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		document.body.classList.add('todo-app');
	}, []);

	useEffect(() => {
		const getTodos = async () => {
			setLoading(true);
			try {
				const user = firebase.auth().currentUser;
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
	}, []);

	const addNewTodo = async (title: string, description: string) => {
		if (!title.trim() || !description.trim()) return;

		try {
			const docRef = await addDoc(collection(db, 'todos'), {
				title,
				description,
				completed: false,
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
			if (!todo) return;

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

	return (
		<>
			<Header />
			<div className='container todo'>
				<h1>Todo List</h1>
				<AddTodo addNewTodo={addNewTodo} />
				{loading ? (
					<p>Loading todos...</p>
				) : todos.length > 0 ? (
					<TodoList
						todos={todos}
						toggleComplete={toggleComplete}
						deleteTodo={deleteTodo}
					/>
				) : (
					<p>No todos yet</p>
				)}
			</div>
		</>
	);
}
