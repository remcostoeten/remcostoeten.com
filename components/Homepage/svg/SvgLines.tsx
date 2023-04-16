import React from 'react';

function SvgAbstractLines() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='100%'
			height='100%'
			viewBox='0 0 100 100'>
			<defs>
				<pattern
					id='abstract-lines'
					width='20'
					height='20'
					patternUnits='userSpaceOnUse'>
					<line
						x1='0'
						y1='0'
						x2='20'
						y2='20'
						stroke='#5da5db'
						strokeWidth='1'
					/>
					<line
						x1='20'
						y1='0'
						x2='0'
						y2='20'
						stroke='#3f8fbf'
						strokeWidth='1'
					/>
				</pattern>
			</defs>
			<rect
				x='0'
				y='0'
				width='100'
				height='100'
				fill='url(#abstract-lines)'
			/>
		</svg>
	);
}

export default SvgAbstractLines;
