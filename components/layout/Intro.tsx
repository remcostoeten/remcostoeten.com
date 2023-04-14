import Link from 'next/link';
import React, { useEffect } from 'react';

export default function Intro() {
	return (
		<>
			<article className='container intro'>
				<div className='intro__heading desktop'>
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
						<Link href='redesign'>Redesign</Link>
						<Link href='tasks'>todo</Link>
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
