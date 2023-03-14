import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import Header from '@/components/header/Header';

interface Todo {
	id: string;
	text: string;
	completed: boolean;
}

const TodoList = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodoText, setNewTodoText] = useState('');

	useEffect(() => {
		// Subscribe to the todos collection in Firestore
		const unsubscribe = db.collection('todos').onSnapshot((snapshot) => {
			const todosData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Todo[];
			setTodos(todosData);
		});

		// Clean up the subscription
		return () => unsubscribe();
	}, []);

	const addTodo = () => {
		// Get the current user
		const currentUser = auth.currentUser;
		if (!currentUser) {
			console.log('User not authenticated');
			return;
		}

		// Create a new todo object
		const newTodo: Todo = {
			id: String(Date.now()),
			text: newTodoText,
			completed: false,
		};

		// Add the new todo to Firestore
		db.collection('todos')
			.doc(currentUser.uid)
			.collection('items')
			.doc(newTodo.id)
			.set(newTodo)
			.then(() => {
				// Update the local state with the new todo
				setTodos([...todos, newTodo]);

				// Clear the input field
				setNewTodoText('');
			})
			.catch((error) => {
				console.error('Error adding todo: ', error);
			});
	};

	const toggleTodoCompletion = (id: string) => {
		// Find the todo in the local state
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		// Update the todo's "completed" field in Firestore
		db.collection('todos')
			.doc(auth.currentUser?.uid || '')
			.collection('items')
			.doc(id)
			.update({ completed: !todo.completed })
			.catch((error) => {
				console.error('Error updating todo: ', error);
			});
	};

	const deleteTodo = (id: string) => {
		// Delete the todo from Firestore
		db.collection('todos')
			.doc(auth.currentUser?.uid || '')
			.collection('items')
			.doc(id)
			.delete()
			.catch((error) => {
				console.error('Error deleting todo: ', error);
			});
	};

	return (
		<>
			<Header />
			<div>
				<ul>
					{todos.map((todo) => (
						<li key={todo.id}>
							<input
								type='checkbox'
								checked={todo.completed}
								onChange={() => toggleTodoCompletion(todo.id)}
							/>
							<span
								style={{
									textDecoration: todo.completed
										? 'line-through'
										: 'none',
								}}>
								{todo.text}
							</span>
							<button onClick={() => deleteTodo(todo.id)}>
								Delete
							</button>
						</li>
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
		</>
	);
};
export default TodoList;
