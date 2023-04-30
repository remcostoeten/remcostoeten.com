import Section from '../components/homepage/Section';
import WebGLCanvas from '../components/homepage/Orb';
import Login from '../components/auth/old/Login';
import React from 'react';
import { Link } from 'react-scroll';

export default function index() {
	return (
		<>
			<Section />
			<Link to='webgl-canvas' smooth={true} duration={500}>
				<WebGLCanvas id='webgl-canvas' />
			</Link>
			<div className='page-wrapper py-5 px-5'></div>
		</>
	);
}
