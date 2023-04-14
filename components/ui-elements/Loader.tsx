import { useEffect, useState } from 'react';

interface LoaderProps {
	isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
	const [show, setShow] = useState(false);
	const delay = 500; // Change this value to set the threshold (in milliseconds)
	let timeout: NodeJS.Timeout | undefined = undefined;

	useEffect(() => {
		if (isLoading) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			timeout = setTimeout(() => {
				setShow(true);
				document.body.classList.add('loading');
			}, delay);
		} else {
			if (timeout) clearTimeout(timeout);
			setShow(false);
			document.body.classList.remove('loading');
		}

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [isLoading]);

	if (!show) {
		return null;
	}

	return (
		<>
			<div id='loading-container'>
				<div
					style={
						{
							'--iteration': 1,
							'--color': 'red',
						} as React.CSSProperties
					}></div>
				<div
					style={
						{
							'--iteration': 2,
							'--color': 'orange',
						} as React.CSSProperties
					}></div>
				<div
					style={
						{
							'--iteration': 3,
							'--color': 'yellow',
						} as React.CSSProperties
					}></div>
				<div
					style={
						{
							'--iteration': 4,
							'--color': 'green',
						} as React.CSSProperties
					}></div>
				<div
					style={
						{
							'--iteration': 5,
							'--color': 'blue',
						} as React.CSSProperties
					}></div>
				<div
					style={
						{
							'--iteration': 6,
							'--color': 'purple',
						} as React.CSSProperties
					}></div>
			</div>
		</>
	);
}
