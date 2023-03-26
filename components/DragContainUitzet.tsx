import { useState } from 'react';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from 'react-beautiful-dnd';
import { PrivateTask } from '@/types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AddCircle } from '@mui/icons-material';
import TaskModal from './Task/TaskModal';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import { useAuth } from './useAuth';

interface DraggableContainerProps {
	PrivateTasks: PrivateTask[];
	updatePrivateTask: (
		PrivateTaskId: string,
		newPrivateTaskData: Partial<PrivateTask>,
	) => Promise<void>;
	removePrivateTask: (PrivateTaskId: string) => void;
}

export default function DraggableContainer({
	PrivateTasks,
	updatePrivateTask,
	removePrivateTask,
}: DraggableContainerProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const addPrivateTask = async (
		title: string,
		description: string,
		category: string,
	) => {
		const now = new Date();
		const formattedDate = `${now.getDate()}/${
			now.getMonth() + 1
		}/${now.getFullYear()}`;

		await addDoc(collection(db, `PrivateTasks-${auth.currentUser?.uid}`), {
			title,
			description,
			category,
			status: 'Uitzet todo',
			date: formattedDate,
		});
	};

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(PrivateTasks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		reorderedItem.status = result.destination.droppableId as
			| 'Uitzet todo'
			| 'inprogress'
			| 'done';
		updatePrivateTask(reorderedItem.id, { status: reorderedItem.status });
	};

	const lanes = [
		{ id: 'Uitzet todo', title: 'To Do' },
		{ id: 'inprogress', title: 'In Progress' },
		{ id: 'done', title: 'Done' },
	];

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			{lanes.map((lane) => (
				<div key={lane.id} className='PrivateTasks__lane'>
					<div className='PrivateTasks__header'>
						<div className='title'>
							{lane.title}{' '}
							<span>
								(
								{
									PrivateTasks.filter(
										(PrivateTask) =>
											PrivateTask.status === lane.id,
									).length
								}
								)
							</span>
						</div>
						<span className='add'>
							<AddCircle onClick={() => setIsModalOpen(true)} />
							Add new PrivateTask
						</span>
					</div>
					<task
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						onSubmit={addPrivateTask} // Make sure this is correctly bound
					/>
					<div className='inner'>
						<Droppable droppableId={lane.id}>
							{(provided) => (
								<div
									className='PrivateTasks__list'
									ref={provided.innerRef}
									{...provided.droppableProps}>
									{PrivateTasks.filter(
										(PrivateTask) =>
											PrivateTask.status === lane.id,
									).map((PrivateTask, index) => (
										<Draggable
											key={PrivateTask.id}
											draggableId={PrivateTask.id}
											index={index}>
											{(provided) => (
												<div
													className='PrivateTask'
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}>
													<div className='PrivateTasks__bottom'>
														{PrivateTask.category}
													</div>
													<div className='PrivateTasks__top'>
														<h3>
															{PrivateTask.title}
														</h3>
														<p>
															{
																PrivateTask.description
															}
														</p>
														<DeleteForeverIcon
															className='remove'
															onClick={() =>
																removePrivateTask(
																	PrivateTask.id,
																)
															}
														/>
													</div>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</div>
			))}
		</DragDropContext>
	);
}
