import Link from 'next/link';
import { useEffect } from 'react';

export default function TopNotice() {
	useEffect(() => {
		const handleHover = () => {
			document.body.classList.toggle('external-hovered');
		};

		const fontBoldElement = document.querySelector('.font-bold');
		const radius = 50;

		const handleMouseEnter = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const rect = target.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const isInRadius =
				Math.abs(event.clientX - centerX) <= radius &&
				Math.abs(event.clientY - centerY) <= radius;

			if (isInRadius) {
				document.body.classList.add('external-hovered');
			}
		};

		const handleMouseLeave = () => {
			document.body.classList.remove('external-hovered');
		};

		if (fontBoldElement instanceof HTMLElement) {
			fontBoldElement.addEventListener('mouseover', handleHover);
			fontBoldElement.addEventListener('mouseout', handleHover);
			fontBoldElement.addEventListener('mouseenter', handleMouseEnter);
			fontBoldElement.addEventListener('mouseleave', handleMouseLeave);
		}

		return () => {
			if (fontBoldElement instanceof HTMLElement) {
				fontBoldElement.removeEventListener('mouseover', handleHover);
				fontBoldElement.removeEventListener('mouseout', handleHover);
				fontBoldElement.removeEventListener(
					'mouseenter',
					handleMouseEnter,
				);
				fontBoldElement.removeEventListener(
					'mouseleave',
					handleMouseLeave,
				);
			}
		};
	}, []);

	return (
		<div className="top-nav relative isolate flex items-center gap-x-6 overflow-hidden text-gray-400 bg-gray-900  px-6 py-1.5 sm:px-1.5 sm:before:flex-1">
			<div
				className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
				aria-hidden="true"
			></div>
			<div
				className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
				aria-hidden="true"
			></div>
			<div className="flex flex-wrap items-center gap-x-2 gap-y-1 items-center">
				<p className="text-sm leading-6 text-gray-400">
					You’re currently on{' '}
					<strong className="font-semibold">
						<Link href="/">remcostoeten.com</Link>
					</strong>
					<svg
						viewBox="0 0 2 2"
						className="mx-2 inline h-0.5 w-0.5 fill-current"
						aria-hidden="true"
					>
						<circle cx={1} cy={1} r={1} />
					</svg>
					Click{' '}
					<Link
						className="font-bold"
						href="https://snippets.remcostoeten.com"
					>
						here{' '}
					</Link>
					to navigate to my snippets. or to view my experimental{' '}
					<small>WiP</small>
				</p>
				<Link
					href="https://experiment.remcostoeten.com"
					className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm link link--arrow"
				>
					Click here <span aria-hidden="true">&rarr;</span>
				</Link>
			</div>
			<div className="flex flex-1 justify-end">
				<button
					type="button"
					className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
				>
					<span className="sr-only">Dismiss</span>
				</button>
			</div>
		</div>
	);
}
