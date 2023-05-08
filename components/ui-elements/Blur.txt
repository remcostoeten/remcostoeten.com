import { useFrame, useThree } from '@react-three/fiber';
import {
	EffectComposer,
	RenderPass,
	KawaseBlurPass,
	KernelSize,
} from 'postprocessing';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

export const Blur = ({ blurRes = 0.5 }) => {
	const { gl, scene, camera, size } = useThree();
	const composer = useMemo(() => {
		let composer = new EffectComposer(gl);
		composer.addPass(new RenderPass(scene, camera));
		const blurPass = new KawaseBlurPass({
			kernelSize: KernelSize.HUGE,
			resolutionScale: blurRes,
		});
		composer.addPass(blurPass);
		return composer;
	}, [blurRes]);
	useEffect(() => composer.setSize(size.width, size.height), [size]);
	useFrame((_, delta) => composer.render(delta), 1);
	return null;
};

export default Blur;
