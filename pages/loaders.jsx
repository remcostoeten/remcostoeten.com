import React, { useEffect, useState } from 'react';
import { InfiniteLoader } from '../components/ui-elements/loaders/Infinite';
import HexaLoader from '../components/ui-elements/loaders/HexaLoader';

export default function Loaders() {
	const [loading, setLoading] = useState(false);

	return (
		<>
			<HexaLoader />
			<InfiniteLoader />
		</>
	);
}
