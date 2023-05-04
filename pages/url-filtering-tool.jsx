import Head from 'next/head';
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min.js';
import AlertMessage from '../components/ui-elements/AlertMessage';
import BlobBackground from '../components/svg-elements/BlobBackground';
function FilteredTextComponent() {
	const [successMessage, setSuccessMessage] = useState('');
	const [tabsToOpen, setTabsToOpen] = useState(50);
	const openUrlsInNewTabs = () => {
		const urls = outputText.split('\n').filter((url) => url.trim() !== '');
		const urlsToOpen = urls.slice(0, tabsToOpen);

		urlsToOpen.forEach((url) => {
			window.open(url, '_blank');
		});

		const remainingUrls = urls.slice(tabsToOpen).join('\n');
		setOutputText(remainingUrls);
		setRemainingUrlsCount(urls.length - tabsToOpen);
	};
	const [remainingUrlsCount, setRemainingUrlsCount] = useState(0);
	const [copied, setCopied] = useState(false);
	const [blockSize] = useState(50);
	const [filter, setFilter] = useState('');
	const [inputText, setInputText] = useState('');
	const [showResetButton, setShowResetButton] = useState(false);
	const [removeClicked, setRemoveClicked] = useState(false);
	const [outputText, setOutputText] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('outputText') || '';
		}
		return '';
	});

	const handlebuttonClick = () => {
		setInitialButtonClicked(true);
	};

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const filterText = () => {
		const lines = inputText.split('\n');
		const filteredLines = lines.filter((line) => line.includes(filter));
		const filteredOutput = filteredLines.join('\n');

		if (filteredOutput !== inputText) {
			setOutputText(filteredOutput);
			setSuccessMessage(`All words not containing "${filter}" removed.`);
		} else {
			setSuccessMessage('No changes made.');
		}

		setRemoveClicked(true);
		setShowResetButton(true);
	};

	const filterTextOpposite = () => {
		const lines = inputText.split('\n');
		const filteredLines = lines.filter((line) => !line.includes(filter));
		const filteredOutput = filteredLines.join('\n');

		if (filteredOutput !== inputText) {
			setOutputText(filteredOutput);
			setSuccessMessage(`All words containing "${filter}" removed.`);
		} else {
			setSuccessMessage('No changes made.');
		}

		setRemoveClicked(true);
		setShowResetButton(true);
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

	const handleInputChange = (e) => {
		setInputText(e.target.value);
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

	const purpleBtnWrapper =
		'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800';

	const greenBtnWrapperOuter =
		'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800';

	const greenBtnWrapperInner =
		'relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0';

	const pinkBtnWrapperOuter =
		'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800';

	const pinkBtnWrapperInner =
		'relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0';

	return (
		<div>
			<Head>
				<title>URL Filtering and Link Opener Tool</title>
				<meta
					name='Remco stoeten - remcostoeten.com '
					content='This tool allows you to filter text and extract URLs. It also enables you to open a list of URLs in new tabs.'
				/>
				<link
					rel='canonical'
					href='https://remcostoeten.com/url-filtering-tool'
				/>
			</Head>
			<BlobBackground />

			<div className='container mx-auto mt-40'>
				<h1 className='text-3xl text-white font-bold mb-4'>
					URL Filtering and Link Opener Tool
				</h1>
				<p className='text-white mt-4 mb-4'>
					This is a tool I use quite often and I got absolutely sick
					off seeing a Cloudfare instance everytime I enter the page
					followed by a captcha and a bunch of ads. So what do you do
					then? Right, recreate and host the functionallity yourself
					🤢 So that is what I did.
				</p>
				<div className='flex align-middle'>
					<div className={`${purpleBtnWrapper} w-full `}>
						<input
							type='text'
							value={filter}
							className='w-full px-3 py-2 border text-white bg-191919 border-gray-300 rounded'
							onChange={handleFilterChange}
							placeholder='Enter letters here'
						/>
					</div>
				</div>
				<div className='flex align-middle'>
					<div className={`${pinkBtnWrapperOuter} w-full bg-191919`}>
						<textarea
							value={inputText}
							onChange={handleInputChange}
							placeholder='Enter text here'
							className='w-full px-3 py-2 border border-gray-300 bg-191919 text-white rounded'
						/>
					</div>
				</div>
				<div className='flex align-middele items-center'>
					<button onClick={filterText} class={purpleBtnWrapper}>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
							Remove not containing
						</span>
					</button>
					<button
						onClick={filterTextOpposite}
						class={greenBtnWrapperOuter}>
						<span class={greenBtnWrapperInner}>
							Remove containing
						</span>
					</button>
					<button
						onClick={removeNonUrls}
						className=' relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
							Remove all text except URLs
						</span>
					</button>
				</div>
				{removeClicked && (
					<>
						<div className='flex align-middle'>
							<button
								onClick={() => {
									setInputText('');
									setOutputText('');
									setFilter('');
									setSuccessMessage('');
									setRemainingUrlsCount(0);
								}}
								className=' relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
								<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
									Clear input
								</span>
							</button>
						</div>
					</>
				)}
				{outputText && (
					<>
						<div className='flex justify-end items-center mt-4'>
							<button
								onClick={copyToClipboard}
								className='bg-blue-700 mr-2 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300 ease-in-out'>
								Copy to clipboard
							</button>
						</div>
					</>
				)}

				{outputText && (
					<div className='flex items-center mt-4'>
						<label htmlFor='tabsToOpen' className='mr-2'>
							Tabs to open:
						</label>
						<input
							id='tabsToOpen'
							type='number'
							value={tabsToOpen}
							className='w-20 px-2 py-1 border border-gray-300 rounded'
							onChange={(e) =>
								setTabsToOpen(parseInt(e.target.value, 10))
							}
						/>
						<button
							onClick={openUrlsInNewTabs}
							className='bg-green-500 text-white py-2 px-4 rounded ml-2 hover:bg-green-600 transition duration-300 ease-in-out'>
							Open URLs
						</button>
					</div>
				)}
				{successMessage && (
					<>
						{' '}
						<AlertMessage
							id='toast-success'
							type='success'
							message={successMessage}
						/>
					</>
				)}
				{remainingUrlsCount > 0 && (
					<div className='text-gray-500 mt-4'>
						Remaining individual URLs: {remainingUrlsCount}
					</div>
				)}
				<div
					className={`${
						preBlocks.length > 1
							? 'mt-10 overflow-y-scroll max-h-60'
							: ''
					}`}>
					<pre className='language-jsx mt-4 whitespace-pre-wrap bg-gray-800 rounded-md p-4'>
						<code className='language-html text-gray-100'>
							{outputText}
						</code>
					</pre>
				</div>
			</div>
		</div>
	);
}

export default FilteredTextComponent;
