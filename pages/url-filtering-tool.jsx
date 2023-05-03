import Head from 'next/head';
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min.js';

function FilteredTextComponent() {
	const [filter, setFilter] = useState('');
	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('outputText') || '';
		}
		return '';
	});

	const [successMessage, setSuccessMessage] = useState('');
	const [remainingUrlsCount, setRemainingUrlsCount] = useState(0);
	const [copied, setCopied] = useState(false);
	const [blockSize] = useState(100);

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const openUrlsInNewTabs = () => {
		const urls = outputText.split(' ').slice(0, 50); // Extract the first 50 URLs
		const linksHtml = urls;
		urls.forEach((url) => {
			window.open(url, '_blank');
		});
		const newWindow = window.open('', '_blank');
		newWindow.document.write(linksHtml);
		newWindow.document.close();
		const remainingUrls = outputText
			.split(' ')
			.slice(50) // Extract the remaining URLs
			.join(' ');
		setOutputText(remainingUrls); // Update the outputText state with the remaining URLs
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

	const removeNonUrls = () => {
		const urlPattern = /https?:\/\/[^\s]+/g;
		let urls = outputText.match(urlPattern);
		if (urls) {
			urls = urls.map((url) => url.replace(/"/g, '').replace(/'/g, ''));
			setOutputText(urls.join(' '));
			setSuccessMessage('All text which is not an URL removed.');
			setRemainingUrlsCount(urls.length);
		} else {
			setOutputText('');
			setSuccessMessage('No URLs found.');
			setRemainingUrlsCount(0);
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(outputText);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1500);
	};

	useEffect(() => {
		localStorage.setItem('outputText', outputText);
	}, [outputText]);

	useEffect(() => {
		Prism.highlightAll();
	}, [outputText]);

	const preBlocks = outputText.split('\n').reduce((acc, cur, idx) => {
		const blockIdx = Math.floor(idx / blockSize);
		if (acc[blockIdx]) {
			acc[blockIdx] += '\n' + cur;
		} else {
			acc[blockIdx] = cur;
		}
		return acc;
	}, []);

	return (
		<div>
			<Head>
				<title>URL Filtering and Link Opener Tool</title>
				<meta
					name='description'
					content='This tool allows you to filter text and extract URLs. It also enables you to open a list of URLs in new tabs.'
				/>
				<link
					rel='canonical'
					href='https://remcostoeten.com/url-filtering-tool'
				/>
			</Head>
			<div className='container mx-auto p-4'>
				<h1 className='text-3xl text-white font-bold mb-4'>
					URL Filtering and Link Opener Tool
				</h1>
				<p className='text-white  my-2'>
tldr: a tool I use quite often but I abssolutely despide the Captcha, ads, Cloudfare stuff other tools throw at you untill the point you rather write it yourself than ever once see a cloudfare logo again. So that's what I did. </p>		
{/* <p className='text-white text-xs  my-6'>
					Welcome to our URL Filtering and Link Opener Tool! This
					handy tool allows you to easily filter text and extract URLs
					from your input. You can also open a list of URLs in new
					tabs with just one click. Use the filtering options to
					remove all words that don't contain a specific letter or
					word, or remove all words that do contain it. Plus, you can
					easily copy the output to your clipboard. Give it a try and
					simplify your URL filtering and link opening process!
		</p> */}
			<input
					type='text'
					value={filter}
					onChange={handleFilterChange}
					placeholder='Enter letters here'
					className='w-full px-3 py-2 border border-gray-300 rounded'
				/>
				<textarea
					value={inputText}
					onChange={handleInputChange}
					placeholder='Enter text here'
					className='w-full px-3 py-2 border border-gray-300 rounded mt-4'
				/>
				<button
					onClick={filterText}
					className='bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-2'>
					Remove NOT containing
				</button>
				<button
					onClick={filterTextOpposite}
					className='bg-red-500 text-white px-4 py-2 rounded mt-4 mr-2'>
					Remove containing
				</button>

				{outputText && (
					<button
						onClick={removeNonUrls}
						className='bg-yellow-500 text-white px-4 py-2 rounded mt-4'>
						Remove all text which is not a URL
					</button>
				)}

				{outputText && (
					<button
						onClick={openUrlsInNewTabs}
						className='bg-green-500 text-white px-4 py-2 rounded mt-4 ml-2'>
						Open URLs in new tabs
					</button>
				)}

				{successMessage && (
					<div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4'>
						{successMessage}
					</div>
				)}

				{remainingUrlsCount > 0 && (
					<div className='text-gray-500 mt-4'>
						Remaining individual URLs: {remainingUrlsCount}
					</div>
				)}

				<div className='flex justify-end items-center mt-4'>
					<button
						onClick={copyToClipboard}
						className='bg-gray-500 text-white px-4 py-2 rounded mr-2'>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>

				<div
					className={`${
						preBlocks.length > 1
							? 'mt-10 overflow-y-scroll max-h-60'
							: ''
					}`}>
					<pre className='language-jsx whitespace-pre-wrap'>
						<code className='language-jsx'>{outputText}</code>
					</pre>
				</div>
			</div>
		</div>
	);
}

export default FilteredTextComponent;
