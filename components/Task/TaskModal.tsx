import { CloseIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (title: string, description: string, category: string) => void;
}

const TaskModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');

	const handleSubmit = () => {
		onSubmit(title, description, category);
		setTitle('');
		setDescription('');
		setCategory('');
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='task-modal'>
			<div className='task-modal__content'>
				<h2>Add new task</h2>
				<input
					type='text'
					placeholder='Task title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder='Task description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}></textarea>
				<input
					type='text'
					placeholder='Task category'
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>
				<span onClick={handleSubmit}>Add Task</span>
				<CloseIcon onClick={onClose} />
			</div>
		</div>
	);
};

export default TaskModal;
