import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/codepen/Sidebar';

export default function Dashboard() {
	const [isSidebarVisible, setSidebarVisible] = useState(true);

	const handleSidebarHide = () => {
		setSidebarVisible(false);
	};

	return (
		<>
			<Sidebar
				onSidebarHide={handleSidebarHide}
				showSidebar={isSidebarVisible}
			/>

			{/* Your other content goes here */}
		</>
	);
}
