import Link from 'next/link';

const slideButton = ({ href, icon, text }) => {
	return (
		<div className='item item--arrow'>
			<Link href={href} className='cta cta-two'>
				{text}
				{icon && <icon />}
			</Link>
		</div>
	);
};

export default slideButton;
