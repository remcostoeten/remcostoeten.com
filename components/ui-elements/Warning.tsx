import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Warning() {
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Stack>
			{open && (
				<div className='container fixed bottom-0 w-full px-4 py-2 text-gray-800'>
					<Alert onClose={handleClose} severity='warning'>
						This feature is abandoned. Hence the UI not being
						perfect. The core functionality does work as intended,
						just the styling which will get a rework. There is a new
						version in the works!
					</Alert>
				</div>
			)}
		</Stack>
	);
}
