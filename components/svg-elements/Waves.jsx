import { useEffect, useState } from 'react';


export default function Waves() {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState(1);
	const waveTwoColor = 'rgb(78, 44, 82)';
	const waveThreeColor = 'rgb(154, 76, 149)';
	const waveFourColor = 'rgb(240, 140, 174)';
  
	useEffect(() => {
	  if (typeof window === 'undefined') return;
  
	  document.body.classList.add('hasWaves');
	  function handleMouseMove(e) {
		setMousePos({ x: e.clientX, y: e.clientY });
		setOpacity(1 - e.clientY / window.innerHeight);
	  }
	  window.addEventListener('mousemove', handleMouseMove);
	  return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);
  
	const translateY = (index) => {
	  if (typeof window === 'undefined') return 'translateY(0)';
  
	  const factor = [10, 20, 30, 40];
	  const offsetY = mousePos.y / window.innerHeight * factor[index];
	  return `translateY(${offsetY}px)`;
	};
  
  return (
    <>
      <div
        className='waves waves-parallax absolute bottom-0 w-full z-0'
        style={{
          '--mouseX': mousePos.x + 'px',
          '--mouseY': mousePos.y + 'px',
        }}>
        <div className='flex'>
          <div className='waves relative w-full h-45vh mb-neg-7 min-h-100px max-h-150px'>
            <svg
              className='absolute bottom-0'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              viewBox='0 24 150 28'
              preserveAspectRatio='none'
              shapeRendering='auto'>
              <defs>
                <path
                  id='gentle-wave'
                  d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
                />
              </defs>
              <g className='parallax'>
                <use
                  xlinkHref='#gentle-wave'
                  x='48'
                  y='0'
                  fill='url(#gradient)'
                  className='waves__animate-one  animate-wave-slow infinite'
                  style={{ opacity, transform: translateY(0) }}
                />
                <use
                  xlinkHref='#gentle-wave'
                  x='48'
                  y='3'
                  fill={waveTwoColor}
                  className='waves__animate-two  animate-wave-slow infinite'
                  style={{ opacity, transform: translateY(1) }}
                />
                <use
                  xlinkHref='#gentle-wave'
                  x='48'
                  y='5'
                  fill={waveThreeColor}
                  className='waves__animate-three  animate-wave-slow infinite'
                  style={{ opacity, transform: translateY(2) }}
                />
                <use
                  xlinkHref='#gentle-wave'
                  x='48'
                  y='7'
                  fill={waveFourColor}
                  className='waves__animate-four  animate-wave-slow infinite'
                  style={{ opacity, transform: translateY(3) }}
                />
              </g>
            </svg>
					</div>
				</div>
			</div>
		</>
	);
	
}
