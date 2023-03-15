import { useEffect, useState } from 'react';

import { db, auth } from '../firebase';
import firebase from 'firebase/compat';

function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodoText, setNewTodoText] = useState('');

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const todoRef = db
					.collection('users')
					.doc(user.uid)
					.collection('todos');
				const unsubscribe = todoRef.onSnapshot((querySnapshot) => {
					const todos = [];
					querySnapshot.forEach((doc) => {
						const data = doc.data();
						todos.push({
							id: doc.id,
							text: data.text,
							completed: data.completed,
						});
					});
					setTodos(todos);
				});
				return unsubscribe;
			} else {
				setTodos([]);
			}
		});
		return unsubscribe;
	}, []);

	function addTodo() {
		// get the current user
		const user = auth.currentUser;
		if (!user) return;

		// add the new todo to Firestore
		const todoRef = db
			.collection('users')
			.doc(user.uid)
			.collection('todos');
		todoRef.add({ text: newTodoText, completed: false });

		// clear the input field
		setNewTodoText('');
	}
	return (
		<div>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.text}</li>
				))}
			</ul>
			<div>
				<input
					type='text'
					value={newTodoText}
					onChange={(e) => setNewTodoText(e.target.value)}
				/>
				<button onClick={addTodo}>Add Todo</button>
			</div>
		</div>
	);
}
export default TodoList;
