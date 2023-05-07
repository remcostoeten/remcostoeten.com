import { useState } from 'react';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from 'react-beautiful-dnd';
import { Task } from '@/utils/types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TaskModal from './TaskModal';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import AddBoxRoundedIcon from '@mui/icons-material/AddBox';
import { Edit } from '@mui/icons-material';
import { Alert } from '@mui/material';

interface DraggableContainerProps {
	isOpen: boolean;
	onClose: () => void;
	editedTask: Task | null;
	onSubmit: (
		title: any,
		description: any,
		category: any,
		taskId: any,
	) => void;
	tasks: Task[];
	updateTask: (taskId: string, newTaskData: Partial<Task>) => Promise<void>;
	removeTask: (taskId: string) => void;
}

export default function DraggableContainer({
	tasks,
	updateTask,
	removeTask,
}: DraggableContainerProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editedTask, setEditedTask] = useState<Task | null>(null);
	const [removeConmfirm, setRemoveConfirm] = useState(false);

	const handleConfirm = () => {
		setRemoveConfirm(!removeConmfirm);
	};

	const addTask = async (
		title: string,
		description: string,
		category: string,
	) => {
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

	const updateExistingTask = async (
		title: string,
		description: string,
		category: string,
		taskId: string,
	) => {
		await updateDoc(doc(db, `tasks-${auth.currentUser?.uid}`, taskId), {
			title,
			description,
			category,
		});
	};

	const openEditModal = (task: Task) => {
		setEditedTask(task);
		setIsModalOpen(true);
		setRemoveConfirm(false);
	};

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(tasks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		reorderedItem.status = result.destination.droppableId as
			| 'todo'
			| 'inprogress'
			| 'done';
		updateTask(reorderedItem.id, { status: reorderedItem.status });
	};

	const lanes = [
		{ id: 'todo', title: 'To Do' },
		{ id: 'inprogress', title: 'In Progress' },
		{ id: 'done', title: 'Done' },
	];

	const confirmDelete = (taskId: string) => {
		removeTask(taskId);
	};

	return (
		<>
			{removeConmfirm && (
				<Alert
					className='confirm-task'
					variant='outlined'
					severity='warning'>
					Are you sure you want to delete this task?
					<button
						className='btn btn--primary'
						onClick={() =>
							editedTask && confirmDelete(editedTask.id)
						}>
						Duh!
					</button>
					<button
						className='btn btn--secondary'
						onClick={() => handleConfirm()}>
						No, close
					</button>
				</Alert>
			)}
			<DragDropContext onDragEnd={handleDragEnd}>
				{lanes.map((lane) => (
					<div key={lane.id} className='tasks__lane'>
						<div className='tasks__header'>
							<div className='title'>
								{lane.title}{' '}
								<span>
									(
									{
										tasks.filter(
											(task) => task.status === lane.id,
										).length
									}
									)
								</span>
							</div>
							<span className='add'>
								<AddBoxRoundedIcon
									onClick={() => setIsModalOpen(true)}
								/>
							</span>
						</div>
						<TaskModal
							isOpen={isModalOpen}
							onClose={() => {
								setIsModalOpen(false);
								setEditedTask(null);
							}}
							editedTask={editedTask}
							onSubmit={(
								title,
								description,
								category,
								taskId,
							) => {
								if (taskId) {
									updateExistingTask(
										title,
										description,
										category,
										taskId,
									);
								} else {
									addTask(title, description, category);
								}
							}}
							tasks={[]}
							updateTask={function (
								taskId: string,
								newTaskData: Partial<Task>,
							): Promise<void> {
								throw new Error('Function not implemented.');
							}}
							removeTask={function (taskId: string): void {
								throw new Error('Function not implemented.');
							}}
						/>
					</div>
				))}
			</DragDropContext>
		</>
	);
}
