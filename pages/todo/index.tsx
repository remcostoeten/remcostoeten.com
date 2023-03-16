import React, { useEffect } from 'react';
import AddTodo from '@/components/Todo/AddTodo';
import Todo from '@/components/Todo/Todo';
import {
	collection,
	query,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { db } from '@/base';
import { auth } from '@/firebase';

interface TodoItem {
	title: string;
	id: string;
	completed: boolean;
}

export default function Index() {
	const [todos, setTodos] = React.useState<TodoItem[]>([]);

	useEffect(() => {
		document.body.classList.add('todo-app');
	}, []);

	useEffect(() => {
		const user = auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		const q = query(collection(db, 'todos', userId, 'userTodos'));
		const unsub = onSnapshot(q, (querySnapshot) => {
			const todosArray: TodoItem[] = [];
			querySnapshot.forEach((doc) => {
				todosArray.push({
					title: '',
					completed: false,
					...doc.data(),
					id: doc.id,
				});
			});
			setTodos(todosArray);
		});
		return () => unsub();
	}, []);
	const handleEdit = async (todo: TodoItem, title: string) => {
		await updateDoc(doc(db, 'todos', todo.id), { title: title });
	};

	const toggleComplete = async (todo: TodoItem) => {
		await updateDoc(doc(db, 'todos', todo.id), {
			completed: !todo.completed,
		});
	};

	const handleDelete = async (id: string) => {
		await deleteDoc(doc(db, 'todos', id));
	};

	return (
		<>
			<div className='todo'>
				<div>
					<AddTodo />
				</div>
				<div className='todo_container'>
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
