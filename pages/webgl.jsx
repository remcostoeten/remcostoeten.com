import Section from '../components/homepage/Section';
import WebGLCanvas from '../components/homepage/Orb';
import React from 'react';
import { Link } from 'react-scroll';

export default function index() {
	return (
		<>
			<Link to='webgl-canvas' smooth={true} duration={500}>
				<WebGLCanvas id='webgl-canvas' />
			</Link>
		</>
	);
}
