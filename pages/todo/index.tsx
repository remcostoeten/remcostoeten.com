import React, { useState, useEffect } from 'react';
import Todo from '@/components/Todo/Todo';
import AddTodo from '@/components/Todo/AddTodo';
import {
	collection,
	addDoc,
	updateDoc,
	deleteDoc,
	query,
	onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import Header from '@/components/header/Header';

interface TodoItem {
	id: string;
	title: string;
	completed: boolean;
}

const TodoList: React.FC = () => {
	const [todos, setTodos] = useState<TodoItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const q = query(collection(db, 'todos'));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const newTodos: TodoItem[] = [];
			snapshot.forEach((doc) => {
				const todo = doc.data() as TodoItem;
				todo.id = doc.id;
				newTodos.push(todo);
			});
			setTodos(newTodos);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const addNewTodo = async (title: string) => {
		const docRef = await addDoc(collection(db, 'todos'), {
			title,
			completed: false,
		});
		setTodos([
			...todos,
			{
				id: docRef.id,
				title,
				completed: false,
			},
		]);
	};

	const toggleComplete = async (id: string) => {
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		await updateDoc(doc(db, 'todos', id), {
			completed: !todo.completed,
		});
		setTodos((prevTodos) =>
			prevTodos.map((t) => {
				if (t.id === id) {
					return { ...t, completed: !t.completed };
				}
				return t;
			}),
		);
	};

	const deleteTodo = async (id: string) => {
		await deleteDoc(doc(db, 'todos', id));
		setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
	};

	return (
		<>
			<Header />
			<h1>Todo List</h1>
			<AddTodo addNewTodo={addNewTodo} />
			{loading ? (
				<p>Loading todos...</p>
			) : todos.length > 0 ? (
				todos.map((todo) => (
					<Todo
						key={todo.id}
						todo={todo}
						toggleComplete={toggleComplete}
						deleteTodo={deleteTodo}
					/>
				))
			) : (
				<p>No todos yet. Add one above!</p>
			)}
		</>
	);
};

export default TodoList;
