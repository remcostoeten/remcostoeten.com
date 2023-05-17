import DnaWaves from '@/components/experimental/DnaWaves';
import WebGLCanvas from '@/components/experimental/Orb';
import React from 'react';

export default function d() {
	return (
		<>
			<WebGLCanvas id="webgl-canvas" />
			<DnaWaves />
		</>
	);
}
