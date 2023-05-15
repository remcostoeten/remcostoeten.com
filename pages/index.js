import Section from '../components/homepage/Section';
import WebGLCanvas from '../components/experimental-elements/Orb';
import React from 'react';
import Hero from '@/components/homepage/mountainParalax/Hero';
import SecondSection from '../components/homepage/mountainParalax/SecondSection';
// import Scene from './Orb';
export default function index() {
	return (
		<>
<<<<<<< HEAD
		
		<div className='z-50'>
				{/* <h1 className='home-heading absolute z-50 top-1/4 left-20 swing-in-top-fwd hero-wrapper text-xxxxl text-white font-bold md:w-3/6 leading-12'> */}
					{/* <span>
						Just another <span className='second'><br/>front-end</span>{' '}
						developer
					</span> */}
					{/* </h1> */}
					<WebGLCanvas id='webgl-canvas' />
					{/* <span>Just another</span>
					<span className='second'>
						{'\u00A0'}front-end{'\u00A0'}
					</span> 
					<span className='third'> develope</span> */}
=======

			<div className='z-50'>
				<WebGLCanvas id='webgl-canvas' />
>>>>>>> 28a7a3d2e1a943ec2c58c77335ed8b066acc84ef
			</div>

		</>
	);
}
