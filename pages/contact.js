import React from 'react';

const ContactPage = () => (
	<div className='min-h-screen flex items-center justify-center bg-gray-100'>
		<div className='max-w-md w-full p-6 text-slate-400 bg-white rounded-lg shadow-md'>
			<h1 className='text-2xl font-bold mb-4'>Contact Us</h1>
			<form name='contact' method='POST' data-netlify='true'>
				<input type='hidden' name='form-name' value='contact' />
				<div className='mb-4'>
					<label htmlFor='name' className='block mb-2 font-medium'>
						Name:
					</label>
					<input
						type='text'
						id='name'
						name='name'
						className='w-full border rounded py-2 px-3'
						required
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='email' className='block mb-2 font-medium'>
						Email:
					</label>
					<input
						type='email'
						id='email'
						name='email'
						className='w-full border rounded py-2 px-3'
						required
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='message' className='block mb-2 font-medium'>
						Message:
					</label>
					<textarea
						id='message'
						name='message'
						className='w-full border rounded py-2 px-3'
						required></textarea>
				</div>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
					Send
				</button>
			</form>
		</div>
	</div>
);

export default ContactPage;
