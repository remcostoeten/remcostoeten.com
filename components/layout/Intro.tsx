import React, { useEffect } from 'react';

export default function Intro() {
	useEffect(() => {
		document.body.classList.add('body-big');
		return () => {
			document.body.classList.remove('body-big');
		};
	}, []);
	return (
		<>
			<article className='container intro'>
				<div className='intro__heading desktop'>
					somewords blabla
					<br />
					<span>
						<div className='intro__effect'>
							{/* <div className='special'>blablawoord</div> */}
							<div className='special'>randomwoord</div>
							<span className='intro__hero--heading-gradient'>
								<div className=''>dummytext</div>
							</span>
						</div>
						<br />
						developer aspiring
						<br />
						just some filler text
						<br />
					</span>
				</div>
				<div className='intro__heading mobile'>
					somewords blabla
					<br />
					<span>
						<div className='intro__effect'>
							{/* <div className='special'>blablawoord</div> */}
							<div className='special'>randomwoord</div>
							<span className='intro__hero--heading-gradient'>
								<div className='gradient'>dummytext</div>
							</span>
						</div>
						<br />
						just some filler text
						<br />
					</span>
				</div>
			</article>
		</>
	);
}
