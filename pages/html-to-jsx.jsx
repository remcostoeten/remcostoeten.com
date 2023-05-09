import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function HtmlToJsxConverter() {
  const [htmlCode, setHtmlCode] = useState('');
  const [jsxCode, setJsxCode] = useState('');

  const handleHtmlChange = (event) => {
    setHtmlCode(event.target.value);
  };

  const handleClearInputClick = () => {
    setHtmlCode('');
  };

  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(jsxCode);
  };

  const handlePasteFromClipboardClick = async () => {
    const text = await navigator.clipboard.readText();
    setHtmlCode(text);
  };

  const handleConvertClick = () => {
	let convertedCode = htmlCode.replace(/<(\w+)\b/g, '<$1')
								 .replace(/<\/(\w+)\b/g, '</$1>')
								 .replace(/(\w+)=/g, ' $1=')
								 .replace(/class="/g, 'className="')
								 .replace(/style="([^"]+)"/g, (match, style) => {
									const styles = style.split(';')
														.filter(style => style.trim() !== '')
														.reduce((acc, style) => {
														  const [property, value] = style.split(':');
														  acc[property.trim()] = value.trim();
														  return acc;
														}, {});
									return `style={${JSON.stringify(styles)}}`;
								  });
  
	setJsxCode(convertedCode);
  };
  
  return (
    <>
      <article className='container mx-auto pt-14 z-10'>
        <h1 className='text-3xl text-white font-bold mb-4'>
          URL Filtering and Link Opener Tool
        </h1>
        <p className='text-white mt-4 mb-4'>
          This is a tool I use quite often and I got absolutely sick
          of seeing a Cloudfare instance every time I enter the page
          followed by a captcha and a bunch of ads. So what do you do
          then? Right, recreate and host the functionality yourself
          🤢 So that is what I did.
        </p>
      
        <div className='flex align-middle mb-4'>
          <div className='w-full bg-191919'>

		  
		    <textarea value={htmlCode} onChange={handleHtmlChange} rows={10} cols={80} className='w-full px-3 py-2 border border-gray-300 bg-191919 text-white rounded'/>
			<div className='flex align-middle items-center flex-wrap'>
			<button onClick={handleClearInputClick} className='btn'>Clear Input</button>
          <button onClick={handleCopyToClipboardClick} className='btn'>Copy to Clipboard</button>
          <button onClick={handlePasteFromClipboardClick} className='btn'>Paste from Clipboard</button>  </div>
	</div>
        </div>
        <div className='flex align-middle items-center flex-wrap'>
          <button onClick={handleConvertClick} className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
            <span className='relative px-2.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
              Convert to JSX
            </span>
          </button>
        </div>
		<SyntaxHighlighter language="jsx" style={docco}>
          {jsxCode}
        </SyntaxHighlighter>
      </article>
    </>
  );
}

export default HtmlToJsxConverter;