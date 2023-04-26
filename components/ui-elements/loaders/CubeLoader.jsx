import React from 'react';

const Loader = () => (
	<div className='absolute w-full  h-full top-0 right-0 flex justify-center items-center loader-backdrop'>
		<div className='scene transitionIn'>
			<div className='cube-wrapper'>
				<div className='cube'>
					<div className='cube-faces'>
						<div className='cube-face shadow' />
						<div className='cube-face bottom' />
						<div className='cube-face top' />
						<div className='cube-face left' />
						<div className='cube-face right' />
						<div className='cube-face back' />
						<div className='cube-face front' />
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Loader;
