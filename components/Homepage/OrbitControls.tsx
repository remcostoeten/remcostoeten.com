import { ReactNode, RefObject, createRef } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera } from 'three';

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
				args: [PerspectiveCamera, HTMLElement];
			} & OrbitControlsProps;
		}
	}
}

const OrbitControls = (props: OrbitControlsProps) => {
	const {
		camera,
		gl: { domElement },
	} = useThree<{ camera: PerspectiveCamera }>();

	const controls = createRef<ThreeOrbitControls>();

	useFrame(() => controls.current?.update());

	return (
		<orbitControls ref={controls} args={[camera, domElement]} {...props} />
	);
};

export default OrbitControls;
