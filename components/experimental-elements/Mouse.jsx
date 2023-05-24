import React from 'react';

function Target() {
	const handleClick = (event) => {
		const target = document.getElementById('target');
		const targetBox = document.getElementById('target-box');
		const xposition =
			event.clientX - target.offsetLeft - target.offsetWidth / 2;
		const yposition =
			event.clientY - target.offsetTop - target.offsetHeight / 2;
		target.style.transform = `translate(${xposition}px, ${yposition}px)`;

		// add animation
		const animateButton = function (e) {
			e.preventDefault;
			//reset animation
			e.target.classList.remove('animate');
			e.target.classList.add('animate');
			setTimeout(function () {
				e.target.classList.remove('animate');
			}, 700);
		};
		const bubblyButtons = document.getElementsByClassName('bubbly-button');
		for (let i = 0; i < bubblyButtons.length; i++) {
			bubblyButtons[i].addEventListener('click', animateButton, false);
		}

		console.log(event);
	};

	return (
		<div id='target-box' onClick={handleClick}>
			<div className='bubbly-button' id='target'>
				Click me
			</div>
		</div>
	);
}
 
export default Target;
