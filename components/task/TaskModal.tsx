import React, { useEffect, useState } from 'react';
import { Task } from '@/utils/types';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (
		title: string,
		description: string,
		category: string,
		taskId?: string,
	) => void;
	editedTask: Task | null;
}
const TaskModal: React.FC<Props> = ({
	isOpen,
	onClose,
	onSubmit,
	editedTask,
}) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');

	useEffect(() => {
		if (editedTask) {
			setTitle(editedTask.title);
			setDescription(editedTask.description);
			setCategory(editedTask.category);
		} else {
			setTitle('');
			setDescription('');
			setCategory('');
		}
	}, [editedTask]);

	const handleSubmit = () => {
		onSubmit(title, description, category, editedTask?.id);
		setTitle('');
		setDescription('');
		setCategory('');
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>
				{editedTask ? 'Edit Task' : 'Add New Task'}
				<IconButton
					edge='end'
					color='inherit'
					onClick={onClose}
					aria-label='close'
					style={{ position: 'absolute', right: '8px', top: '8px' }}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<TextField
					label='Task Title'
					variant='outlined'
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					margin='normal'
				/>
				<TextField
					label='Task Description'
					variant='outlined'
					fullWidth
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					multiline
					rows={4}
					margin='normal'
				/>
				<TextField
					label='Task Category'
					variant='outlined'
					fullWidth
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					margin='normal'
				/>
				<Button
					onClick={handleSubmit}
					variant='contained'
					color='primary'>
					{editedTask ? 'Save Changes' : 'Add Task'}
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default TaskModal;
