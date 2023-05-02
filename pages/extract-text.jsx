import React, { useState } from 'react';

const FilteredTextComponent = () => {
	const [filter, setFilter] = useState('a');
	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const handleInputChange = (e) => {
		setInputText(e.target.value);
	};

	const filterText = () => {
		const lines = inputText.split('\n');
		const filteredLines = lines.filter((line) => line.includes(filter));
		setOutputText(filteredLines.join('\n'));
		setSuccessMessage(`All words not containing "${filter}" removed.`);
	};

	const filterTextOpposite = () => {
		const lines = inputText.split('\n');
		const filteredLines = lines.filter((line) => !line.includes(filter));
		setOutputText(filteredLines.join('\n'));
		setSuccessMessage(`All words containing "${filter}" removed.`);
	};

	return (
		<div className='container mx-auto p-4'>
			<input
				type='text'
				value={filter}
				onChange={handleFilterChange}
				placeholder='dood'
				className='w-full px-3 py-2 border border-gray-300 rounded'
			/>
			<textarea
				value={inputText}
				onChange={handleInputChange}
				placeholder='Vul hier de tekst in'
				className='w-full px-3 py-2 border border-gray-300 rounded mt-4'></textarea>
			<button
				onClick={filterText}
				className='bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-2'>
				Remove NOT containing
			</button>
			<button
				onClick={filterTextOpposite}
				className='bg-red-500 text-white px-4 py-2 rounded mt-4'>
				Remove containing
			</button>
			{successMessage && (
				<div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4'>
					{successMessage}
				</div>
			)}
			<div className='mt-4'>
				<pre className='bg-gray-100 p-4 rounded'>{outputText}</pre>
			</div>
		</div>
	);
};

export default FilteredTextComponent;
