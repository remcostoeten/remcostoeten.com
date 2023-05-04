import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise';

const BlobBackground = () => {
	const container = useRef(null);

	useEffect(() => {
		const width = container.current.clientWidth;
		const height = container.current.clientHeight;
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
		const scene = new THREE.Scene();
		renderer.setSize(width, height);
		container.current.appendChild(renderer.domElement);

		// OrbitControls for camera rotation
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableZoom = false;

		// ImprovedNoise for creating a Perlin noise
		const noise = new ImprovedNoise();

		// Shader material
		const material = new THREE.ShaderMaterial({
			uniforms: {
				time: { value: 1.0 },
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
		});

		// Sphere geometry
		const geometry = new THREE.SphereBufferGeometry(5, 64, 64);

		// Mesh
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Set camera position
		camera.position.z = 10;

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);

			// Update time uniform
			material.uniforms.time.value += 0.05;

			// Render scene
			renderer.render(scene, camera);
		};

		animate();
	}, []);

	return <div ref={container} style={{ width: '100%', height: '100vh' }} />;
};
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float time;

  float random(vec3 scale, float seed) {
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453123 + seed);
  }

  // Perlin noise function
  float noise(vec2 pos) {
    vec2 i = floor(pos);
    vec2 f = fract(pos);

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(random(vec3(i + vec2(0.0, 0.0), 0.0), random(vec3(i + vec2(1.0, 0.0), 0.0), u.x), u.y),
      mix(random(vec3(i + vec2(0.0, 1.0), 0.0), random(vec3(i + vec2(1.0, 1.0), 0.0), u.x), u.y),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv * 10.0 - 1.0;

    float noiseValue = noise(uv * time * 0.1);

    float blur = smoothstep(0.4, 0.45, noiseValue);

    // Set the base color and blurred color
    vec4 baseColor = vec4(0.1, 0.2, 0.5, 1.0);
    vec4 blurredColor = vec4(0.6, 0.7, 1.0, 1.0);

    // Mix the colors based on the blur value
    gl_FragColor = mix(baseColor, blurredColor, blur);
  }
`;

export default BlobBackground;
