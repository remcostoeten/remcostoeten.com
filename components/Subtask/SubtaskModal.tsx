import { useState } from 'react';

import { Subtask } from '@/types';
import { Button, FormGroup, Modal, TextField, Typography } from '@mui/material';

interface SubtaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (title: string, description: string) => void;
	subtasks: Subtask[];
}

export default function SubtaskModal({
	isOpen,
	onClose,
	onSubmit,
	subtasks,
}: SubtaskModalProps) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(title, description);
		setTitle('');
		setDescription('');
	};

	return (
		<Modal open={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<FormGroup>
					<TextField
						id='title'
						label='Title'
						variant='outlined'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<TextField
						id='description'
						label='Description'
						multiline
						variant='outlined'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</FormGroup>
				{subtasks.length > 0 && (
					<FormGroup>
						<Typography variant='subtitle1'>
							Existing subtasks
						</Typography>
						<ul>
							{subtasks.map((subtask) => (
								<li key={subtask.id}>
									<Typography variant='body1'>
										{subtask.title}
									</Typography>
									<Typography variant='body2'>
										{subtask.description}
									</Typography>
								</li>
							))}
						</ul>
					</FormGroup>
				)}
			</form>
			<Button variant='outlined' onClick={onClose}>
				Cancel
			</Button>
			<Button variant='contained' onClick={handleSubmit}>
				Save
			</Button>
		</Modal>
	);
}
