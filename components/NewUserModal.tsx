import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
} from '@mui/material';

type NewUserModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (name: string, email: string, password: string) => void;
};

const NewUserModal = ({ isOpen, onClose, onSubmit }: NewUserModalProps) => {
	const [newUserName, setNewUserName] = useState('');
	const [newUserEmail, setNewUserEmail] = useState('');
	const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
	const [newUserPassword, setNewUserPassword] = useState('');

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewUserName(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewUserEmail(event.target.value);
	};

	const handleSignUpClick = () => {
		setIsNewUserModalOpen(true);
	};

	const handleNewUserModalClose = () => {
		setIsNewUserModalOpen(false);
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setNewUserPassword(event.target.value);
	};

	const handleSubmit = () => {
		onSubmit(newUserName, newUserEmail, newUserPassword);
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogTitle>Create New User</DialogTitle>
			<DialogContent>
				<TextField
					margin='normal'
					label='Name'
					variant='outlined'
					fullWidth
					value={newUserName}
					onChange={handleNameChange}
				/>
				<TextField
					margin='normal'
					label='Email'
					variant='outlined'
					fullWidth
					value={newUserEmail}
					onChange={handleEmailChange}
				/>
				<TextField
					margin='normal'
					label='Password'
					variant='outlined'
					fullWidth
					type='password'
					value={newUserPassword}
					onChange={handlePasswordChange}
				/>
				<DialogActions>
					<Button onClick={handleNewUserModalClose} color='secondary'>
						Cancel
					</Button>
					<Button onClick={handleSubmit} color='primary'>
						Register
					</Button>
				</DialogActions>{' '}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color='secondary'>
					Cancel
				</Button>
				<Button onClick={handleSubmit} color='primary'>
					Create User
				</Button>
			</DialogActions>
			<button onClick={handleSignUpClick}>Sign Up</button>
			<NewUserModal
				isOpen={true}
				onClose={() => console.log('closed')}
				onSubmit={(name, email, password) =>
					console.log(name, email, password)
				}
			/>
		</Dialog>
	);
};

export default NewUserModal;
