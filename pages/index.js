import Section from '../components/homepage/Section';
import WebGLCanvas from '../components/homepage/Orb';
import Login from '../components/auth/old/Login';
import React from 'react';

export default function index() {
	return (
		<>
			<Section />
		
		<WebGLCanvas/>
			<div className='page-wrapper py-5 px-5'></div>
		</>
	);
}
