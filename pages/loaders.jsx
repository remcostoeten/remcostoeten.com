import React, { useEffect, useState } from 'react';
import { InfiniteLoader } from '../components/ui-elements/loaders/Infinite';

export default function Loaders() {
	const [loading, setLoading] = useState(false);

	return (
		<>
			<InfiniteLoader />
		</>
	);
}
