// useGrilledEffect.js
import { useEffect, useState } from 'react';

const useGrilledEffect = (canvasRef, isRed) => {
	const colorOne = 'rgba(169, 81, 219, 1)';
	const colorTwo = 'rgba( 197, 0, 62, 1)';
	const [changeColor, setChangeColor] = useState(true);
	useEffect(() => {
		const ctx = canvas.getContext('2d');
		const oSize = {
			h: document.body.clientHeight,
			w: document.body.clientWidth,
		};
		const oMouse = {
			x: oSize.w / 2,
			y: oSize.h / 2,
		};

		canvas.height = oSize.h;
		canvas.width = oSize.w;

		const rand = (min, max) => Math.ceil(Math.random() * (max - min) + min);

		const onResize = () => {
			oSize.w = canvas.width = window.innerWidth;
			oSize.h = canvas.height = window.innerHeight;
			setGrilled();
			buildGrilled();
		};

		const onMouseMove = (e) => {
			oMouse.y = e.pageY;
			oMouse.x = e.pageX;
		};

		const interact = 455;
		const radius = 0.3;
		const maxRad = 7;
		const dist = 25;

		const oGrilled = {
			iCol: 0,
			iLine: 0,
			aDots: [],
		};

		function setGrilled() {
			oGrilled.aDots = [];

			oGrilled.iCol = Math.ceil(oSize.w / dist);
			oGrilled.iLine = Math.ceil(oSize.h / dist);
			oGrilled.margTop = (oSize.h - oGrilled.iLine * dist) / 2;
			oGrilled.margLeft = (oSize.w - oGrilled.iCol * dist) / 2;
		}

		function buildGrilled() {
			for (let l = 0; l <= oGrilled.iLine; l++) {
				for (let c = 0; c <= oGrilled.iCol; c++) {
					addDot(l, c);
				}
			}
		}

		function addDot(l, c) {
			oGrilled.aDots.push(buildDot(l, c));
		}

		function buildDot(l, c) {
			const px = Math.ceil(c * dist + oGrilled.margLeft);
			const py = Math.ceil(l * dist + oGrilled.margTop);

			const oDot = {
				x: px,
				y: py,
				bx: px,
				by: py,
				tx: px,
				ty: py,
				s: rand(0.2, 1),
				c: isRed ? colorOne : colorTwo,
				r: radius,
			};

			return oDot;
		}

		oGrilled.aDots.forEach((dot) => {
			dot.c = isRed ? colorOne : colorTwo;
		});

		function getRadius(dot) {
			const dx = oMouse.x - dot.x;
			const dy = oMouse.y - dot.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			const distPourcent = (distance * 100) / interact;

			let rad = (maxRad * (100 - distPourcent)) / 100;

			if (rad < radius) rad = radius;

			return rad;
		}

		function update() {
			oGrilled.aDots.forEach(function (dot) {
				dot.r += (getRadius(dot) - dot.r) * 0.03;
			});
		}

		function draw(ctx) {
			oGrilled.aDots.forEach(function (dot) {
				ctx.beginPath();
				ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI, false);
				ctx.fillStyle = dot.c;
				ctx.fill();
			});
		}

		window.addEventListener('resize', onResize);
		document.addEventListener('mousemove', onMouseMove);

		setGrilled();
		buildGrilled();

		const render = () => {
			ctx.clearRect(0, 0, oSize.w, oSize.h);
			update();
			draw(ctx);
			requestAnimationFrame(render);
		};
		render();

		return () => {
			window.removeEventListener('resize', onResize);
			document.removeEventListener('mousemove', onMouseMove);
		};
	}, [canvasRef, isRed]);
};

export default useGrilledEffect;
