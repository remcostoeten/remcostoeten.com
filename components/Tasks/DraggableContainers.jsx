import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TaskModal from './TaskModal';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import AddBoxRoundedIcon from '@mui/icons-material/AddBox';
import { Edit } from '@mui/icons-material';
import { Alert } from '@mui/material';

export default function DraggableContainer(props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editedTask, setEditedTask] = useState(null);
	const [removeConmfirm, setRemoveConfirm] = useState(false);

	const handleConfirm = () => {
		setRemoveConfirm(!removeConmfirm);
	};

	const addTask = async () => {
		const now = new Date();
		const formattedDate = `${now.getDate()}/${
			now.getMonth() + 1
		}/${now.getFullYear()}`;

		await addDoc(collection(db, `tasks-${auth.currentUser?.uid}`), {
			title,
			description,
			category,
			status: 'todo',
			date: formattedDate,
		});
	};
	const updateExistingTask = async () => {
		await updateDoc(doc(db, `tasks-${auth.currentUser?.uid}`, taskId), {
			title,
			description,
			category,
		});
	};

	const openEditModal = (task) => {
		setEditedTask(task);
		setIsModalOpen(true);
		setRemoveConfirm(false);
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const items = Array.from(tasks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		reorderedItem.status = result.destination.droppableId;
		updateTask(reorderedItem.id, { status: reorderedItem.status });
	};

	const lanes = [
		{ id: 'todo', title: 'To Do' },
		{ id: 'inprogress', title: 'In Progress' },
		{ id: 'done', title: 'Done' },
	];

	const confirmDelete = (taskId) => {
		removeTask(taskId);
	};

	return <></>;
}
