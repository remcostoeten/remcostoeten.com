import { useState } from 'react';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Task } from '@/types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { RemoveOutlined } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

interface DraggableContainerProps {
	tasks: Task[];
	updateTask: (taskId: string, newTaskData: Partial<Task>) => Promise<void>;
	removeTask: (taskId: string) => void;
	addTask: (newTaskData: Partial<Task>) => Promise<void>;
}

interface Category {
	id: string;
	name: string;
}

const DraggableContainer = ({
	tasks,
	updateTask,
	removeTask,
	addTask,
}: DraggableContainerProps) => {
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleCreateTask = async (data: {
		title: string;
		description: string;
		category: string;
	}) => {
		const now = new Date();
		const formattedDate = `${now.getDate()}/${
			now.getMonth() + 1
		}/${now.getFullYear()}`;

		const newTask = {
			title: data.title,
			description: data.description,
			category: data.category,
			status: 'todo' as 'todo' | 'inprogress' | 'done',
			date: formattedDate,
		};
		await addTask(newTask); // Add this function to your DraggableContainerProps
		toast.success(`Task "${newTask.title}" created`);
		reset(); // Reset the form
		handleClose();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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

	const handleTaskDelete = (task: Task) => {
		removeTask(task.id);

		toast.success(`Task "${task.title}" deleted`, {
			closeButton: (
				<button
					onClick={() => {
						updateTask(task.id, { status: task.status });
						toast.dismiss();
					}}>
					Undo
				</button>
			),
		});
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<ToastContainer autoClose={false} />
				<Droppable droppableId='todo'>
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}>
							{tasks
								.filter((task) => task.status === 'todo')
								.map((task, index) => (
									<Draggable
										key={task.id}
										draggableId={task.id}
										index={index}>
										{(provided) => (
											<div
												className='tasks__task'
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<h2 className='title'>
													{task.title}
												</h2>
												<p className='description'>
													{task.description}
												</p>
												<span className='category'>
													{task.category}
												</span>
												<button
													onClick={() => {
														handleTaskDelete(task);
													}}>
													<RemoveOutlined />
												</button>
											</div>
										)}
									</Draggable>
								))}
							{provided.placeholder}
							<Button
								variant='outlined'
								onClick={handleClickOpen}>
								Add Task
							</Button>
						</div>
					)}
				</Droppable>
			</DragDropContext>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Task</DialogTitle>
				<DialogContent>
					{/* Your task creation form goes here */}
					<form onSubmit={handleSubmit(handleCreateTask)}>
						<TextField
							{...register('title', { required: true })}
							label='Title'
							fullWidth
							margin='normal'
							error={!!errors.title}
							helperText={errors.title && 'Title is required'}
						/>
						<TextField
							{...register('description', { required: true })}
							label='Description'
							fullWidth
							margin='normal'
							multiline
							rows={4}
							error={!!errors.description}
							helperText={
								errors.description && 'Description is required'
							}
						/>
						<TextField
							{...register('category', { required: true })}
							label='Category'
							fullWidth
							margin='normal'
							error={!!errors.category}
							helperText={
								errors.category && 'Category is required'
							}
						/>
						<Button type='submit'>Add Task</Button>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit(handleCreateTask)}>
						Create Task
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
export default DraggableContainer;
