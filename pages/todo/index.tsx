import React, { useEffect, useState } from 'react';
import AddTodo from '@/components/todo/AddTodo';
import Todo from '@/components/Todo/Todo';
import {
	collection,
	query,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
	where,
} from 'firebase/firestore';
import { auth, db } from '@/firebase';
import Header from '@/components/header/Header';

interface TodoItem {
	title: string;
	id: string;
	completed: boolean;
}

export default function TodoList() {
	const [todos, setTodos] = useState<TodoItem[]>([]);
	const user = auth.currentUser;

	useEffect(() => {
		document.body.classList.add('todo-app');

		// Return early if the user is not logged in
		if (!user) {
			return;
		}

		// Create a reference to the todos collection for the user
		const todosRef = collection(db, 'users', user.uid, 'todos');

		// Create a query that only fetches todos for the current user
		const q = query(todosRef, where('userId', '==', user.uid));

		const unsub = onSnapshot(q, (querySnapshot) => {
			const todosArray: TodoItem[] = [];
			querySnapshot.forEach((doc) => {
				todosArray.push({ ...doc.data(), id: doc.id });
			});
			setTodos(todosArray);
		});
		return () => unsub();
	}, [user]);

	const handleEdit = async (todo: TodoItem, title: string) => {
		await updateDoc(doc(db, 'users', user?.uid, 'todos', todo.id), {
			title: title,
		});
	};

	const toggleComplete = async (todo: TodoItem) => {
		await updateDoc(doc(db, 'users', user?.uid, 'todos', todo.id), {
			completed: !todo.completed,
		});
	};

	const handleDelete = async (id: string) => {
		await deleteDoc(doc(db, 'users', user?.uid, 'todos', id));
	};

	return (
		<>
			<Header />
			<div className='todo'>
				<div>
					<AddTodo />
				</div>
				<div className='todo__wrapper'>
					{todos.map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							toggleComplete={toggleComplete}
							handleDelete={handleDelete}
							handleEdit={handleEdit}
						/>
					))}
				</div>
			</div>
		</>
	);
}
