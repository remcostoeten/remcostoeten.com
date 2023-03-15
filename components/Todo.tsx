import { useEffect, useState } from 'react';
import { db } from '../firebase';

interface TodoItem {
	id: string;
	text: string;
}

const TodoPage = () => {
	const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
	const [newItem, setNewItem] = useState<string>('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Add new item to Firestore
		const docRef = await db.collection('todos').add({ text: newItem });
		const newItemObject = { id: docRef.id, text: newItem };

		// Update state with new item
		setTodoItems([...todoItems, newItemObject]);
		setNewItem('');
	};

	// Load items from Firestore when component mounts
	useEffect(() => {
		const unsubscribe = db.collection('todos').onSnapshot((snapshot) => {
			const items: TodoItem[] = snapshot.docs.map((doc) => ({
				id: doc.id,
				text: doc.data().text,
			}));
			setTodoItems(items);
		});
		return unsubscribe;
	}, []);

	return (
		<div>
			<h1>Todo List</h1>
			<form onSubmit={handleSubmit}>
				<label>
					New Item:
					<input
						type='text'
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
					/>
				</label>
				<button type='submit'>Add Item</button>
			</form>
			<ul>
				{todoItems.map((item) => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		</div>
	);
};

export default TodoPage;
