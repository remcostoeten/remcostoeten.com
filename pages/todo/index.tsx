import React from 'react';
import { db } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import Header from '../../components/header/Header';
import AddTodo from '../../components/Todo/AddTodo';
import TodoList from '@/components/Todo/TodoList';

interface Todo {
	id: string;
	title: string;
	completed: boolean;
}

export default function IndexPage() {
	const [todos, setTodos] = React.useState<Todo[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		// Fetch todos from the 'todos' collection
		const getTodos = async () => {
			setLoading(true);
			const todosSnapshot = await getDocs(collection(db, 'todos'));
			setTodos(
				todosSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as Todo[]
			);
			setLoading(false);
		};

		getTodos();
	}, []);

	const addNewTodo = async (title: string) => {
		if (title.trim() !== '') {
			const docRef = await addDoc(collection(db, 'todos'), {
				title,
				completed: false,
			});
			const newTodo = {
				id: docRef.id,
				title,
				completed: false,
			};
			setTodos([...todos, newTodo]);
		}
	};

	const toggleComplete = async (id: string) => {
		const todo = todos.find((todo) => todo.id === id);
		if (!todo) return;
		await updateDoc(doc(db, 'todos', id), {
			completed: !todo.completed,
		});
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deleteTodo = async (id: string) => {
		await deleteDoc(doc(db, 'todos', id));
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};

	return (
		<>
			<Header />
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
		</>
	);
}
