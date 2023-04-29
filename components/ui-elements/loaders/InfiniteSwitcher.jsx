import React from 'react';

export default function InfiniteSwitcher() {
	return (
		<>
			<input
				id='theme-toggle'
				className='checkbox theme-toggle__checkbox visually-hidden'
				type='checkbox'
			/>
			<label htmlFor='theme-toggle' className='label theme-toggle__label'>
				Toggle theme
			</label>
			<input
				id='outline-toggle'
				className='checkbox outline-toggle__checkbox visually-hidden'
				type='checkbox'
			/>
			<label
				htmlFor='outline-toggle'
				className='label outline-toggle__label'>
				Toggle outline
			</label>
		</>
	);
}
``;
