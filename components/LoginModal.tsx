import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';

interface LoginModalProps {
	onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
	const handleDialogClose = () => {
		onClose();
	};

	return (
		<Dialog open={true} onClose={handleDialogClose}>
			<DialogTitle>Login</DialogTitle>
			<DialogContent>
				<DialogContentText>Please login to continue.</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default LoginModal;
