import { Modal, Box, Typography } from '@mui/material';

const Modal = () => {
	return (
		<Modal open={showLoginModal} onClose={handleClose}>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					Text in a modal
				</Typography>
				<Typography id='modal-modal-description' sx={{ mt: 2 }}>
					Duis mollis, est non commodo luctus, nisi erat porttitor
					ligula.
				</Typography>
			</Box>
		</Modal>
	);
};

export default Modal;
