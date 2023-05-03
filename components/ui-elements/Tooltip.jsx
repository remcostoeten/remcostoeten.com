
	// const Tooltips = {
	// 	input1: 'Tooltip text for input 1',
	// 	input2: 'Tooltip text for input 2',
	// 	button1:
	// 		'Enter the characters or word(s) you want to filter out. This will remove all lines which contain the characters or words you enter here.',
	// 	split: 'This will open the URLs in new tabs. It will only open the first 50 URLs which then get removed from the output box. This to prevent your browser for eating up all your RAM.',
	// 	remove: 'Enter your text here where you want to filter {$} from.',
	// };

import React, { useState } from 'react';
import { Info } from '@mui/icons-material';

const Tooltip = ({ title, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className='relative'
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Info className='h-4 w-4 text-gray-400 ml-1 inline-block align-middle' />
      {showTooltip && (
        <div className='bg-gray-100 text-gray-900 text-xs rounded py-1 px-4 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10'>
          {title && <h2 className='font-bold mb-2'>{title}</h2>}
          <p className='mb-0'>{text}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
