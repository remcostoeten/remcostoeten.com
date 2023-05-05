import { useEffect } from 'react';

export default function BlobOne() {
	useEffect(() => {
		const blobOne = document.querySelector('.blob__one');
		const blurFilter = blobOne.querySelector('#blur > feGaussianBlur');
		let blurAmount = 0;

		setInterval(() => {
			blurAmount += 1;
			blurFilter.setAttribute('stdDeviation', blurAmount);
		}, 75);
	}, []);

	return (
		<>
			<div className='blob__one'>
				<svg viewBox='0 0 440 440' xmlns='http://www.w3.org/2000/svg'>
					<defs>
						<filter id='blur'>
							<feGaussianBlur
								in='SourceGraphic'
								stdDeviation='0'
							/>
						</filter>
						<linearGradient
							id='gradient'
							x1='0%'
							y1='0%'
							x2='100%'
							y2='0%'>
							<stop
								id='stop1'
								offset='0%'
								stop-color='#8A3FFC'
								stop-opacity='1'
							/>
							<stop
								id='stop2'
								offset='100%'
								stop-color='#FFD6E8'
								stop-opacity='1'
							/>
						</linearGradient>
					</defs>
					<path
						d='M220,395.53933411763103C271.8988843733411,399.28979104676273,323.36573655072516,368.30051209877934,349.6520298646874,323.3940436316749C372.848170364204,283.7666705571006,343.7948804868436,238.55291586785117,338.5982704679198,192.9307186917393C331.7534786640762,132.83876640607272,369.0303268781619,49.869482662585064,315.3274132463682,22.050586714023297C261.80355225889144,-5.675557341862472,214.6213199786505,70.60418830124968,163.2117166815451,102.07791461461652C122.69721741777346,126.881495653392,65.49578104475033,136.0213108761244,53.91379179138397,182.09190679017962C42.20023622667081,228.6858444405604,82.38906398758922,268.29517513919006,111.8929945303254,306.21246001382997C142.09524249258556,345.02719482283237,170.9470303752646,391.99453634317103,220,395.53933411763103'
						fill='url(#gradient)'
						filter='url(#blur)'
					/>
				</svg>
			</div>
		</>
	);
}
