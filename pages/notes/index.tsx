import { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '@/utils/firebase'; // import your Firebase config file here
import { Transition } from '@headlessui/react';

const CreateItem = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const categories = ['Category 1', 'Category 2', 'Category 3']; // define your own categories here

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const docRef = await db.collection('items').add({
				title,
				description,
				category,
			});

			setTitle('');
			setDescription('');
			setCategory('');
			setShowSuccessMessage(true);

			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 3000);
		} catch (error) {
			toast.error('Error creating item.');
		}
	};

	return (
		<div className='max-w-xl mx-auto'>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label
						htmlFor='title'
						className='block font-medium text-gray-700 mb-2'>
						Title
					</label>
					<input
						id='title'
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='form-input w-full'
					/>
				</div>
				<div>
					<label
						htmlFor='description'
						className='block font-medium text-gray-700 mb-2'>
						Description
					</label>
					<textarea
						id='description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='form-textarea w-full'
					/>
				</div>
				<div>
					<label
						htmlFor='category'
						className='block font-medium text-gray-700 mb-2'>
						Category
					</label>
					<select
						id='category'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className='form-select w-full'>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300'>
					Create Item
				</button>
			</form>
			<Transition
				show={showSuccessMessage}
				enter='transition ease-out duration-300 transform'
				enterFrom='opacity-0 scale-50'
				enterTo='opacity-100 scale-100'
				leave='transition ease-in duration-300 transform'
				leaveFrom='opacity-100 scale-100'
				leaveTo='opacity-0 scale-50'>
				<div className='bg-green-500 text-white text-center py-2 px-4 mt-4 rounded'>
					Item created successfully!
				</div>
			</Transition>
		</div>
	);
};

export default CreateItem;
