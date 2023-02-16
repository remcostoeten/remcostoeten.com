import React from 'react';

export default function Intro() {
	return (
		<>
			<article className='container intro'>
				<div className='intro__heading desktop'>
					remcostoeten, a
					<br />
					<span>
						<div className='intro__effect'>
							<div className='special'>divjesschuiver</div>
							<span className='intro__hero--heading-gradient'>
								<div className='gradient'>front-end</div>
							</span>
						</div>
						<br />
						developer aspiring
						<br />
						to make cool stuff.
						<br />
					</span>
				</div>
				<div className='intro__heading mobile'>
					remcostoeten, a
					<br />
					<span>
						<div className='intro__effect'>
							<div className='special'>divjesschuiver</div>
							<span className='intro__hero--heading-gradient'>
								<div className='gradient'>front-end</div>
							</span>
						</div>
						developer aspiring
						<br />
						to make cool stuff.
						<br />
					</span>
				</div>
			</article>
		</>
	);
}
