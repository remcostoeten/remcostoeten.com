import Section from '../components/homepage/Section';
import WebGLCanvas from '../components/experimental-elements/Orb';
import React from 'react';
import Hero from '@/components/homepage/mountainParalax/Hero';
import SecondSection from '../components/homepage/mountainParalax/SecondSection';
// import Scene from './Orb';
export default function index() {
	return (
		<>

			<div className='z-50'>
				<WebGLCanvas id='webgl-canvas' />
			</div>

		</>
	);
}
