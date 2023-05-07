import Link from 'next/link';
import { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';

export default function SlideButton(
	icon,
	label,
	ctaClass,
	link, // Remove the default value
	bgColor = 'false',
	textColor = 'text-black',
	borderColor = 'border-gray-300',
	border = 'false',
) {
	return (
		<div className='item item--arow'>
			<div
				className={`cta ${ctaClass} ${bgColor} ${border} ${textColor} hover:${bgColor} hover:${textColor}`}>
				<Link href={link} className={textColor}>
					{Icon}
					{label}
				</Link>
			</div>
		</div>
	);
}
