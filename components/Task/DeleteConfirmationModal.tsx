
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

interface Props {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<Props> = ({
	isOpen,
	onConfirm,
	onCancel,
}) => {
	return (
		<Dialog open={isOpen} onClose={onCancel} fullWidth maxWidth='xs'>
			<DialogTitle>Confirm Delete</DialogTitle>
			<DialogContent>
				<p>Are you sure you want to delete this task?</p>
				<div>
					<Button
						variant='contained'
						color='secondary'
						onClick={onConfirm}>
						Yes
					</Button>
					<Button
						variant='outlined'
						color='primary'
						onClick={onCancel}>
						No
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteConfirmationModal;
