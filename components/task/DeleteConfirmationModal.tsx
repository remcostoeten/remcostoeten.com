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
					<button
						type='button'
						onClick={onConfirm}
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
						Yes
					</button>

					<button
						type='button'
						onClick={onCancel}
						className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium
						text-gray-900 focus:outline-none bg-white rounded-lg
						border border-gray-200 hover:bg-gray-100
						hover:text-blue-700 focus:z-10 focus:ring-4
						focus:ring-gray-200 dark:focus:ring-gray-700
						dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
						dark:hover:text-white dark:hover:bg-gray-700'>
						No
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteConfirmationModal;
