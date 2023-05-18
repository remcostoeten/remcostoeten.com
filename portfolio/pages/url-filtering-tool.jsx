import Head from 'next/head';
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min.js';
import Waves from '../components/svg-elements/Waves.js';

function FilteredTextComponent() {
	const [successMessage, setSuccessMessage] = useState('');
	const [remainingUrlsCount, setRemainingUrlsCount] = useState(0);
	const [copied, setCopied] = useState(false);
	const [blockSize] = useState(50);
	const [filter, setFilter] = useState('');
	const [inputText, setInputText] = useState('');
	const [showResetButton, setShowResetButton] = useState(false);
	const [removeClicked, setRemoveClicked] = useState(false);
	const [extractClicked, setExtractClicked] = useState(false);
	const [copyText, setCopyText] = useState('');
	const [outputText, setOutputText] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedOutputText = localStorage.getItem('outputText') || '';
			setOutputText(storedOutputText);
		}
	}, []);

	const openUrls = () => {
		const urlPattern = /https?:\/\/[^\s]+/g;
		let urls = outputText.match(urlPattern);
		if (urls) {
			urls = urls
				.slice(0, Math.min(urls.length, 50))
				.map((url) => url.replace(/"/g, '').replace(/'/g, ''));

			for (let i = urls.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[urls[i], urls[j]] = [urls[j], urls[i]];
			}

			urls.forEach((url) => {
				if (typeof window !== 'undefined') {
					window.open(url, '_blank');
					// Remove the URL from outputText once it has been opened
					setOutputText((prevText) => prevText.replace(url, ''));
				}
			});
		}
		setExtractClicked(true);
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
			const remainingCount = urls.length;
			setRemainingUrlsCount(remainingCount);
			const copyCount = Math.min(remainingCount, 50);
			setCopyText(urls.slice(0, copyCount).join(' '));
		} else {
			setOutputText('');
			setSuccessMessage('No URLs found.');
			setRemainingUrlsCount(0);
			setCopyText('');
		}
		setRemoveClicked(true);
		setExtractClicked(false);
		setShowResetButton(true);
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

	const handleCopyClick = () => {
		const copyCount = Math.min(remainingUrlsCount, 50);
		const copiedText = copyText.split(' ').slice(0, copyCount).join(' ');
		navigator.clipboard.writeText(copiedText);
		setCopied(true);
		setCopyText(copyText.split(' ').slice(copyCount).join(' '));
		setRemainingUrlsCount(remainingUrlsCount - copyCount);
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
		'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:e xt-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800';

	const greenBtnWrapperOuter =
		'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800';

	const greenBtnWrapperInner =
		'relative px-2.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0';

	const pinkBtnWrapperOuter =
		'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800';

	const pinkBtnWrapperInner =
		'relative px-2.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0';

	return (
		<main>
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
			<Waves />

			<article className='contain mx-auto pt-14 z-10'>
				<h1 className='text-3xl text-white  font-bold mb-4'>
					URL Filtering and Link Opener Tool
				</h1>
				<p className='text-white text-lg mt-4 mb-4'>
					This is a tool I use quite often and I got absolutely sick
					off seeing a Cloudfare instance everytime I enter the page
					followed by a captcha and a bunch of ads. So what do you do
					then? Right, recreate and host the functionallity yourself
					🤢 So that is what I did.
				</p>
				<div className='flex align-middle mb-4'>
				<div className={`${pinkBtnWrapperOuter} w-full text-black  bg-191919`}>
						<input
							type='text'
							value={filter}
							className='w-full text-black px-3 text-lg py-2 border border-gray-300 bg-191919 rounded'
							onChange={handleFilterChange}
							placeholder='Enter letters here'
						/>
					</div>
				</div>
				<div className='flex align-middle mb-4'>
					<div className={`${pinkBtnWrapperOuter} w-full text-black  bg-191919`}>
						<textarea
							value={inputText}
							onChange={handleInputChange}
							placeholder='Enter text here'
							className='w-full text-black px-3 text-lg py-2 border border-gray-300 bg-191919 rounded'
						/>
					</div>
				</div>
				<div className='flex align-middele items-center flex-wrap'>
					<button onClick={filterText} class={purpleBtnWrapper}>
						<span className='relative text-xl  px-8 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
							Remove not containing
						</span>
					</button>
					<button
						onClick={filterTextOpposite}
						className='relative text-xl inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'>
						<span className='relative px-8 py-4  text-xl transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
							Remove containing
						</span>
					</button>

					<button
						onClick={removeNonUrls}
						className=' relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
						<span className='relative px-8 py-4  text-xl transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
							Remove all text except URLs
						</span>
					</button>
					{removeClicked && (
						<>
							<div className='flex align-middle'>
								<button
									onClick={() => {
										setInputText('');
										setOutputText('');
										setFilter('');
										setSuccessMessage('URLS cleared');
										setRemainingUrlsCount(0);
									}}
									className=' relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
									<span className='relative  px-8 py-4  text-xl transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
										Clear input
									</span>
								</button>
							</div>
						</>
					)}
					{remainingUrlsCount > 0 && !extractClicked && (
						<div
							className='text-gray-500 flex 
					 items-baseline flex-col'>
							<button
								onClick={openUrls}
								className='flex relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
								<span className='relative px-2.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
									Open urls
								</span>
							</button>
						</div>
					)}

					{remainingUrlsCount > 0 && (
						<div className='text-gray-500  flex items-baseline flex-col'>
							<button
								onClick={handleCopyClick}
								className='flex relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
								<span className='relative px-2.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
									{copied ? 'Copied!' : 'Copy 50 URLs'}{' '}
								</span>
							</button>
						</div>
					)}
					{remainingUrlsCount > 0 && !extractClicked && (
						<span className='text-white'>
							Remaining individual URLs: {remainingUrlsCount}
						</span>
					)}
				</div>

				{outputText && (
					<>
						<div className='flex justify-end items-center mt-4'>
							<button
								onClick={copyToClipboard}
								class={purpleBtnWrapper}>
								<span className='relative  px-8 py-4  text-xl transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
									Copy to
								</span>
							</button>
						</div>
					</>
				)}

				<div
					className={`${
						preBlocks.length > 1
							? 'mt-10 overflow-y-scroll max-h-60'
							: '0'
					}`}>
					<pre className='language-jsx mt-4 whitespace-pre-wrap bg-gray-800 rounded-md p-4'>
						<code className='language-html text-gray-100'>
							{outputText}
						</code>
					</pre>
				</div>
			</article>
		</main>
	);
}

export default FilteredTextComponent;
