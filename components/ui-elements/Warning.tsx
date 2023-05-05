import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Warning() {
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Stack>
			{open && (
				<div className='chat-warning'>
					<Alert onClose={handleClose} severity='warning'>
						This feature is abandoned. Hence the UI not being
						perfect. The core functionallitys does work how
						intended, just the styling which will get a rework,
						there's a new version in the works!
					</Alert>
				</div>
			)}
		</Stack>
	);
}
