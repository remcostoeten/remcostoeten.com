import { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setShow(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	const handleTransitionEnd = () => {
		if (!show) {
			document.body.classList.remove('loading');
		}
	};

	return (
		<div
			className={`load-wrapper ${show ? '' : 'fade-out'}`}
			onTransitionEnd={handleTransitionEnd}>
			<div className='loader'>
				<div>
					<div>
						<div>
							<div>
								<div>
									<div>
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
