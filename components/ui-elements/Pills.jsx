export const Pills = ({ variant, text, visible }) => {
	let backgroundColor, textColor;

	switch (variant) {
		case 'wip':
			backgroundColor = 'bg-red-200';
			textColor = 'text-red-800';
			break;
		case 'tool':
			backgroundColor = 'bg-cyan-200';
			textColor = 'text-cyan-800';
			break;
		case 'experiment':
			backgroundColor = 'bg-teal-200';
			textColor = 'text-teal-800';
			break;
		case 'old':
			backgroundColor = 'bg-amber-200';
			textColor = 'text-amber-800';
			break;
		case 'showcase':
			backgroundColor = 'bg-green-200';
			textColor = 'text-green-800';
			break;
		case 'upcoming':
			backgroundColor = 'bg-indigo-200';
			textColor = 'text-indigo-800';
			break;
		default:
			backgroundColor = '';
			textColor = '';
			break;
	}
	return (
		<div
			className={`flex h-6 pill text-xs align-middle px-3 py-2 items-center justify-center ml-2 rounded-full ${backgroundColor} ${textColor} ${
				visible
					? 'opacity-100 transition-opacity duration-500 ease-in-out'
					: 'opacity-0'
			}`}
			style={{ transition: 'opacity 1s ease-in-out' }}>
			{text}
		</div>
	);
};
