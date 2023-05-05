import React from 'react';

const Avatar = ({ url }) => (
	<img
		src={url}
		alt='User Avatar'
		className='w-10 h-10 rounded-full object-cover'
	/>
);

export default Avatar;
