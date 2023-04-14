import { ReactNode, RefObject, createRef } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera, WebGLRenderer } from 'three';

extend({ OrbitControls: ThreeOrbitControls });

interface OrbitControlsProps {
	enableDamping?: boolean;
	dampingFactor?: number;
	enableZoom?: boolean;
	zoomSpeed?: number;
	enableRotate?: boolean;
	rotateSpeed?: number;
	children?: ReactNode;
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			orbitControls: {
				ref?: RefObject<ThreeOrbitControls>;
				args: [PerspectiveCamera, WebGLRenderer['domElement']];
			} & OrbitControlsProps;
		}
	}
}

const OrbitControls = (props: OrbitControlsProps) => {
	const { camera, gl } = useThree<{
		camera: PerspectiveCamera;
		gl: WebGLRenderer;
	}>();

	const controls = createRef<ThreeOrbitControls>();

	useFrame(() => controls.current?.update());

	return (
		<orbitControls
			ref={controls}
			args={[camera, gl.domElement]}
			{...props}
		/>
	);
};

export default OrbitControls;
