import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function WipAlert() {
	const [open, setOpen] = React.useState(true);

	return (
		<Box
			sx={{
				width: '40%',
				position: 'absolute',
				bottom: '-80px',
				zIndex: '999',
				margin: '0 auto',
				textAlign: 'center',
			}}>
			<Collapse in={open}>
				<Alert
					action={
						<IconButton
							aria-label='close'
							color='inherit'
							onClick={() => {
								setOpen(false);
							}}>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					}
					sx={{ mb: 10 }}>
					The UI may be broken due to work in progress. Please be
					patient and check back later for updates.
				</Alert>
			</Collapse>
		</Box>
	);
}
