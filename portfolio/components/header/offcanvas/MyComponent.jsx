import { useEffect, useRef } from 'react';
import {
	Camera,
	Transform,
	Mesh,
	Polyline,
	Color,
	Orbit,
	Vec2,
	Vec3,
	Post,
} from 'ogl';
import { Renderer } from 'ogl';

export default function MyComponent() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const renderer = new Renderer({ canvas: canvasRef.current });
		const gl = renderer.gl;
		gl.clearColor(0.0, 0.0, 0.0, 1);

		const camera = new Camera(gl, { fov: 15 });
		camera.position.set(1, -3, 4);

		function resizeCanvas() {
			canvasRef.current.width = window.innerWidth;
			canvasRef.current.height = window.innerHeight;
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
		}

		window.addEventListener('resize', resizeCanvas);
		resizeCanvas();

		const controls = new Orbit(camera, {
			target: new Vec3(0, 0, 0),
		});

		const scene = new Transform();

		const segsPerLine = 256;
		const points = [];
		for (let i = 0; i <= segsPerLine; i++) {
			const x = (i / segsPerLine - 0.5) * 2;
			points.push(new Vec3(x, 0, 0));
		}

		const instancesTotal = 50;
		const offsets = new Float32Array(instancesTotal);
		for (let i = 0; i < instancesTotal; i++) {
			const offs = (i / (instancesTotal - 1) - 0.5) * 2;
			offsets[i] = offs;
		}

		const vertex = /* glsl */ `
		precision highp float;
		attribute float aOffset;
		attribute vec3 position;
		attribute vec3 next;
		attribute vec3 prev;
		attribute vec2 uv;
		attribute float side;
		uniform mat4 modelMatrix;
		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;
		uniform mat3 normalMatrix;
		uniform vec2 uResolution;
		uniform float uDPR;
		uniform float uThickness;
		uniform float uMiter;
		uniform float uTime;
		
		varying vec2 vUv;
		varying vec2 vNormal;
		varying float vDepth;
		
		// ================================================
		// Simplex 2D noise
		// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
		vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
	  
		float snoise(vec2 v) {
		  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
				   -0.577350269189626, 0.024390243902439);
		  vec2 i  = floor(v + dot(v, C.yy) );
		  vec2 x0 = v -   i + dot(i, C.xx);
		  vec2 i1;
		  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
		  vec4 x12 = x0.xyxy + C.xxzz;
		  x12.xy -= i1;
		  i = mod(i, 289.0);
		  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		  + i.x + vec3(0.0, i1.x, 1.0 ));
		  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
			dot(x12.zw,x12.zw)), 0.0);
		  m = m*m ;
		  m = m*m ;
		  vec3 x = 2.0 * fract(p * C.www) - 1.0;
		  vec3 h = abs(x) - 0.5;
		  vec3 ox = floor(x + 0.5);
		  vec3 a0 = x - ox;
		  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
		  vec3 g;
		  g.x  = a0.x  * x0.x  + h.x  * x0.y;
		  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
		  return 130.0 * dot(m, g);
		}
	  
		void main() {
		  float noiseAmp = 0.25;
		  float currNoise = snoise(vec2(aOffset, position.x) * 1.5 - uTime * 0.1) * noiseAmp;
		  float nextNoise = snoise(vec2(aOffset, next.x) * 1.5 - uTime * 0.1) * noiseAmp;
		  float prevNoise = snoise(vec2(aOffset, prev.x) * 1.5 - uTime * 0.1) * noiseAmp;
		  
		  vec3 cPos = position + vec3(0.0, aOffset, currNoise);
		  vec3 nPos = next + vec3(0.0, aOffset, nextNoise);
		  vec3 pPos = prev + vec3(0.0, aOffset, prevNoise);
		  
		  mat4 mvp = projectionMatrix * modelViewMatrix;
		  vec4 currPos = mvp * vec4(cPos, 1);
		  vec4 nextPos = mvp * vec4(nPos, 1);
		  vec4 prevPos = mvp * vec4(pPos, 1);
		  
		  vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
		  vec2 currScreen = currPos.xy / currPos.w * aspect;
		  vec2 nextScreen = nextPos.xy / nextPos.w * aspect;
		  vec2 prevScreen = prevPos.xy / prevPos.w * aspect;
	  
		  vec2 dirPrev = normalize(currScreen - prevScreen);
		  vec2 dirNext = normalize(nextScreen - currScreen);
		  vec2 dir2 = normalize(dirPrev + dirNext);
	  
		  vec2 normal = vec2(-dir2.y, dir2.x);
		  normal /= mix(1.0, max(0.3, dot(normal, vec2(-dirPrev.y, dirPrev.x))), uMiter);
		  normal /= aspect;
		  float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
		  float pixelWidth = currPos.w * pixelWidthRatio;
		  normal *= pixelWidth * uThickness;
		  currPos.xy -= normal * side;
	  
		  vDepth = currNoise / noiseAmp * 0.5 + 0.5;
		  vUv = uv;
		  gl_Position = currPos;
		}    `;

		const fragment = /* glsl */ `
		precision highp float;
		uniform float uTime;
		uniform vec3 uColor1;
		uniform vec3 uColor2;
	  
		varying vec2 vUv;
		varying float vDepth;
		void main() {
		  float shading = vDepth * vDepth * 0.9 + 0.1;
		  gl_FragColor.rgb = mix(uColor1, uColor2, abs(sin(uTime)) * vDepth) * shading;
		  gl_FragColor.a = 1.0;
		}    `;
		const polyline = new Polyline(gl, {
			points,
			vertex,
			fragment,
			uniforms: {
				uColor1: { value: new Color('#e91e63') },
				uColor2: { value: new Color('#673ab7') },
				uTime: { value: 0 },
				uThickness: { value: 2 },
			},
			attributes: {
				aOffset: { instanced: 2, size: 1, data: offsets },
			},
		});

		const mesh = new Mesh(gl, polyline);
		mesh.setParent(scene);

		requestAnimationFrame(update);

		function update(now) {
			mesh.program.uniforms.uTime.value = now * 0.001;
			controls.update();
			renderer.render({ scene, camera });
			requestAnimationFrame(update);
		}
		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: '0',
				left: '0',
			}}
		/>
	);
}
