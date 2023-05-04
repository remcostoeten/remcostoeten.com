import Link from 'next/link';

export default function SlideButton({ icon: Icon, label }) {
	return (
		<div className='item item--arrow'>
			<div className='cta cta-two'>
				<Link href='#'>
					{Icon && <Icon />}
					{label}
				</Link>
			</div>
		</div>
	);
}
