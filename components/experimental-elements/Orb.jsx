import React, { useEffect, useRef } from 'react';

const vertexShader = `
  attribute vec4 a_position;
  
  uniform mat4 u_modelViewMatrix;
  uniform mat4 u_projectionMatrix;
  
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShader = ` precision highp float;
precision highp int;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_noise;

// movement variables
vec3 movement = vec3(.0);

const int maxIterations = 256;
const float stopThreshold = 0.001;
const float stepScale = .8;
const float eps = 0.005;
const vec3 clipColour = vec3(0.);
const vec3 fogColour = vec3(0.);

const vec3 light1_position = vec3(0, 1., -1.);
const vec3 light1_colour = vec3(.5, .8, 1.85);

const int octaves = 3;

struct Surface {
  int object_id;
  float distance;
  vec3 position;
  vec3 colour;
  float ambient;
  float spec;
};

float bumps(in vec3 p, float phase, float size, vec3 frequency) {
  return size * sin(p.x * frequency.x + phase) * cos(p.y * frequency.y + phase) * cos(p.z * frequency.z + phase);
}

float fractalBumps(in vec3 p, float phase, float size, vec3 frequency, float multiplier) {
  // const float octaves = 2.;
  float _bumps = bumps(p, phase, size, frequency);
  for(int i = 1; i < octaves; i++) {
    float f = float(i);
    _bumps += bumps(p, phase + f * 10., size * multiplier * 1./f, frequency * f);
  }
  
  return _bumps;
}

// This function describes the world in distances from any given 3 dimensional point in space
float world(in vec3 position, inout int object_id) {
  vec3 pos = floor(position * .5);
  object_id = int(floor(pos.x + pos.y + pos.z));
  // position = mod(position, 1.) - .5;
  float gradient = max(0., (position.y + .3));
  float bumps = fractalBumps(position, u_time * 2., .5 * gradient, vec3(10. + sin(u_time) * 5.), 2.8);
  
  float world = length(position) - .4 + bumps * .15;
  
  // world = max(world, -position.y);
  
  return world;
}
float world(in vec3 position) {
  int dummy = 0;
  return world(position, dummy);
}

Surface getSurface(int object_id, float rayDepth, vec3 sp) {
  return Surface(
    object_id, 
    rayDepth, 
    sp, 
    vec3(1.), 
    .5, 
    200.);
}

// The raymarch loop
Surface rayMarch(vec3 ro, vec3 rd, float start, float end, inout vec3 col) {
  float sceneDist = 1e4;
  float rayDepth = start;
  int object_id = 0;
  
  // Light position
  vec3 lp = ro + vec3(2, 2, -5.);
  
  bool hit = false;
  
  for(int i = 0; i < maxIterations; i++) {
    vec3 r = ro + rd * rayDepth;
    sceneDist = world(r, object_id);
    
    vec3 normal = normalize(r);
    vec3 ld = lp - r;
    float len = length( ld );
    ld = normalize(ld);
    float diffuse = max(0., dot(normal, ld))+.2;
    
    float weighting = length(r);
    
    // col += clamp((1./abs(sceneDist))*diffuse*.02*light1_colour, 0.005, .05);
    col += clamp((1./abs(sceneDist))*weighting*diffuse*.005*light1_colour, 0.0, 1.);
    // col *= abs(sceneDist) * (1. / weighting)*diffuse*.02*light1_colour;
    
    
    if(sceneDist < stopThreshold) {
      rayDepth += .08;
    } else {
      rayDepth += sceneDist * stepScale;
    }
    
    if(rayDepth > end) {
      break;
    }
  }
  
  col = sqrt(col);
  
  return getSurface(object_id, rayDepth, ro + rd * rayDepth);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
  
  // Camera and look-at
  vec3 cam = vec3(cos(u_mouse.x * 5.)*3.,u_mouse.y * 3.,sin(u_mouse.x * 5.)*3.);
  vec3 lookAt = vec3(0,0,0);
  
  // Unit vectors
  vec3 forward = normalize(lookAt - cam);
  vec3 right = normalize(vec3(forward.z, 0., -forward.x));
  vec3 up = normalize(cross(forward, right));
  
  // FOV
  float FOV = .4;
  
  // Ray origin and ray direction
  vec3 ro = cam;
  vec3 rd = normalize(forward + FOV * uv.x * right + FOV * uv.y * up);
  
  // Ray marching
  const float clipNear = 0.;
  const float clipFar = 32.;
  vec3 col = vec3(0.);
  Surface objectSurface = rayMarch(ro, rd, clipNear, clipFar, col);
  
  
  gl_FragColor = vec4(col, 1.);
}`;

const WebGLCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (!gl) {
      alert('WebGL is not available on your browser.');
      return;
    }

    // Create and compile the vertex shader
    const vertexShaderObj = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObj, vertexShader);
    gl.compileShader(vertexShaderObj);

    // Create and compile the fragment shader
    const fragmentShaderObj = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObj, fragmentShader);
    gl.compileShader(fragmentShaderObj);

    // Create and link the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShaderObj);
    gl.attachShader(shaderProgram, fragmentShaderObj);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Error linking shaders.');
      return;
    }

    gl.useProgram(shaderProgram);

    // Create buffer for vertex data
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1, -1, 1, 1, -1]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(shaderProgram, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(shaderProgram, 'u_mouse');
    const timeLoc = gl.getUniformLocation(shaderProgram, 'u_time');

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);

    let mouseX = 0;
    let mouseY = 0;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX / canvas.width;
      mouseY = 1 - e.clientY / canvas.height;
    });

    function render(time) {
      time *= 0.001;

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseX, mouseY);
      gl.uniform1f(timeLoc, time);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />;
};


export default WebGLCanvas;
