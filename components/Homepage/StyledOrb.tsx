// StyledOrb.tsx
import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00e6ff, 0 0 20px #00e6ff, 0 0 25px #00e6ff, 0 0 30px #00e6ff, 0 0 35px #00e6ff;
  }
  100% {
    box-shadow: 0 0 5px #fff, 0 0 10px #00e6ff, 0 0 15px #00e6ff, 0 0 20px #00e6ff, 0 0 25px #00e6ff, 0 0 30px #00e6ff, 0 0 35px #00e6ff;
  }
`;

export const Orb = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	background: radial-gradient(
		circle at 50% 50%,
		rgba(0, 230, 255, 0.9),
		transparent
	);
	border-radius: 50%;
	pointer-events: none;
	animation: ${glow} 1.5s ease-in-out infinite alternate;
`;

export const Particle = styled.div`
	position: absolute;
	width: 3px;
	height: 3px;
	background: #00e6ff;
	border-radius: 50%;
	pointer-events: none;
`;
