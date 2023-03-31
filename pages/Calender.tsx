// src/App.tsx
import React from 'react';
import Calendar from '../components/Calender';
import AsideSmall from '@/components/Task/AsideSmall';

const App: React.FC = () => {
	return (
		<>
			<div className='dashboard'>
				<AsideSmall
					view={''}
					isLoggedIn={false}
					setIsLoggedIn={function (value: boolean): void {
						throw new Error('Function not implemented.');
					}}
				/>
				<Calendar />
			</div>
		</>
	);
};

export default App;
