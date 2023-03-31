import { useState } from 'react';

const ToggleView = () => {
	const [view, setView] = useState('board');
	setView(view === 'board' ? 'list' : 'board');
	const toggleView = () => {
		setView(view === 'board' ? 'list' : 'board');
	};
};

return (
	<div className={`toggle-view ${view === 'board' ? 'grid' : 'list'}`}>
		<div className='view'>
			<button className='board-view' onClick={toggleView}>
				Board view
			</button>
			<button className='list-view' onClick={toggleView}>
				List view
			</button>
		</div>
		<button
			className='add task'
			onClick={() => setIsModalOpen(true)}
			disabled={!isLoggedIn}>
			Add task
		</button>
	</div>
);
