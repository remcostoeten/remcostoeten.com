import React from 'react';
export default function Intro() {
	return (
		<>
			<article className='container intro'>
				<div className='intro__heading'>
					remcostoeten a,
					<br />
					<span>
						<div className='intro__effect'>
							<span className='intro__hero--heading-gradient'>
								<div className='special'>divjesschuiver</div>
								front-end developer
							</span>
						</div>
						<br />
						aspiring to make
						<br />
						cool stuff.
					</span>
					<svg id='filters'>
						<defs>
							<filter id='threshold'>
								<feColorMatrix
									in='SourceGraphic'
									type='matrix'
									values='1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140'
								/>
							</filter>
						</defs>
					</svg>
				</div>
			</article>
		</>
	);
}
