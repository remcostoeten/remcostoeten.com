import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { useControls } from 'leva';
import { Blur } from '@/components/ui-elements/Blur';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { glslNoise } from '@/utils/glslNoise';
import { glslMap } from '@/utils/glslMap';
import { getDevicePixelRatio } from '@/utils/getDevicePixelRatio';

const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

const Blob = ({
	radius,
	color1,
	color2,
	minBlobSize,
	blobWaviness,
	blob2 = false,
}) => {
	const ref = useRef(null);
	const posOffset = blob2 ? Math.PI : 0;
	useFrame(({ scene, camera, clock }) => {
		let t = clock.elapsedTime;
		if (ref.current) {
			ref.current.material.uniforms.uTime.value = t * 0.5;
			ref.current.material.uniforms.uColor1.value.set(color1);
			ref.current.material.uniforms.uColor2.value.set(color2);
			ref.current.material.uniforms.uMinBlob.value = minBlobSize;
			ref.current.material.uniforms.uBlobWaviness.value = blobWaviness;
			// ref.current.material.uniformsNeedUpdate = true;
			ref.current.position.x = Math.sin(t + posOffset) * 0.25;
			ref.current.rotation.z = t * 0.2 * (blob2 ? 1 : -1);
		}
	});
	const uniforms = useMemo(() => {
		return {
			uTime: { value: 0.0 },
			uColor1: { value: new THREE.Color(color1) },
			uColor2: { value: new THREE.Color(color2) },
			uMinBlob: { value: minBlobSize },
			uBlobWaviness: { value: blobWaviness },
			uNoiseOffset: { value: blob2 ? 100 : 0 },
		};
	}, []);
	return (
		<mesh ref={ref}>
			<circleGeometry args={[radius, 100]} />
			<shaderMaterial
				uniforms={uniforms}
				vertexShader={`
          uniform float uTime;
          uniform float uMinBlob;
          uniform float uNoiseOffset;
          uniform float uBlobWaviness;
          varying vec2 vUv;

          ${glslNoise}
          ${glslMap}

          void main() {
            vUv = uv;
            float n = snoise(vec3(uv.x * uBlobWaviness, uv.y * uBlobWaviness, (uTime + uNoiseOffset)));
            vec3 pos = position * map(n, 0.0, 1.0, uMinBlob, 1.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
				fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv;

            // left to right gradient
            float d = distance(uv.x, 0.);
            vec3 color = mix(uColor1, uColor2, d);

            gl_FragColor = vec4(color,0.7);
          }
        `}
				// wireframe={true}
				blending={THREE.AdditiveBlending}
				side={THREE.DoubleSide}
			/>
		</mesh>
	);
};

const BackgroundPlane = () => {
	return (
		<mesh>
			<planeGeometry args={[20, 20]} />
			<meshBasicMaterial color={'#191919'} toneMapped={false} />
		</mesh>
	);
};

const Scene = ({
	blob1Color1,
	blob1Color2,
	blob2Color1,
	blob2Color2,
	minBlobSize,
	blobWaviness,
	radius,
	hideBlob1,
	hideblob2,
}) => {
	return (
		<>
			<BackgroundPlane />
			{!hideBlob1 && (
				<Blob
					radius={radius}
					minBlobSize={minBlobSize}
					blobWaviness={blobWaviness}
					color1={blob1Color1}
					color2={blob1Color2}
				/>
			)}
			{!hideblob2 && (
				<Blob
					radius={radius}
					minBlobSize={minBlobSize}
					blobWaviness={blobWaviness}
					blob2
					color1={blob2Color1}
					color2={blob2Color2}
				/>
			)}
		</>
	);
};

export default function App() {
	const vals = useControls({
		blob1Color1: '#1EFF6B',
		blob1Color2: '#2FDAFF',
		blob2Color1: '#FEC672',
		blob2Color2: '#4BEA8B',
		radius: {
			min: 1,
			max: 3,
			value: 1.9,
		},
		blurRes: {
			min: 0.1,
			max: 1,
			value: 0.23,
		},
		minBlobSize: {
			min: 0.1,
			max: 1,
			value: 0.95,
		},
		blobWaviness: {
			min: 0.01,
			max: 10,
			value: 0.2,
		},
		hideBlob1: false,
		hideblob2: false,
	});

	return (
		<>
			<div className='three-blob'>
				<div className='container  mt-4 text-off-white pt-4 pb-4 w-2/4 text-start'>
					<h1 className='text-xxl font-bold mb-2'>
						ThreeJS Blob experiment
					</h1>
					<p className='mb-2 text-neutral-300'>
						Througout my site I have used various abstract SVG
						elements and wanting to animate and blur them
						<span className='markup'>
							<code className='block css bg-black-800 rounded-md p-2 whitespace-pre '>
								.blob &#123; filter: blur(100px)&#125;;
							</code>
						</span>
						but this caused the entire site to lag because filters
						are quite heavy rendering wise, so trying to come up
						with some other solution
					</p>
				</div>

				<Canvas
					dpr={Math.min(dpr, 2)}
					// <Canvas
					// flat
					// dpr={Math.min(devicePixelRatio, 2)}
					// frameloop="always"
					// onCreated={(state) => console.log(state.gl)}
				>
					{/* <color attach="background" args={["#191919"]} /> */}
					<Scene {...vals} />
					<Blur blurRes={vals.blurRes} />
					{/* <EffectComposer>
        <DepthOfField
          focusDistance={2}
          focalLength={0.2}
          bokehScale={20}
          height={480}
        />
      </EffectComposer> */}
				</Canvas>
			</div>
		</>
	);
}
