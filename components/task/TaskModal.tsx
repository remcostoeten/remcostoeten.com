import React, { useEffect, useState } from 'react';
import { Task } from '@/utils/types';
import { Dialog } from '@headlessui/react';
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
		<Dialog open={isOpen} onClose={onClose}>
			<Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-30' />
			<div className='fixed inset-0 flex items-center justify-center'>
				<div className='bg-white rounded-md p-6 max-w-md w-full mx-auto'>
					<Dialog.Title className='text-xl font-semibold flex justify-between items-center'>
						{editedTask ? 'Edit Task' : 'Add New Task'}
						<button
							onClick={onClose}
							aria-label='close'
							className='focus:outline-none'>
							<CloseIcon />
						</button>
					</Dialog.Title>
					<div className='mt-4'>
						<label className='block'>
							<span className='text-gray-700'>Task Title</span>
							<input
								type='text'
								className='mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</label>
						<label className='block mt-4'>
							<span className='text-gray-700'>
								Task Description
							</span>
							<textarea
								className='mt-1 block w-full h-24 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
								value={description}
								onChange={(e) =>
									setDescription(e.target.value)
								}></textarea>
						</label>
						<label className='block mt-4'>
							<span className='text-gray-700'>Task Category</span>
							<input
								type='text'
								className='mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</label>
						<button
							onClick={handleSubmit}
							className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
							{editedTask ? 'Save Changes' : 'Add Task'}
						</button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default TaskModal;
