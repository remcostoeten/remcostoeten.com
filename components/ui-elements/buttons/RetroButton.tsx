import Link from 'next/link';
import { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';

type SlideButtonProps = {
	icon?: ReactNode,
	label: ReactNode,
	ctaClass: string,
	link?: string,
	bgColor?: string,
	textColor?: string,
	borderColor?: string,
	border?: boolean,
};

export default function SlideButton({
	icon,
	label,
	ctaClass,
	link = '#',
	bgColor = 'false',
	textColor = 'text-black',
	borderColor = 'border-gray-300',
	border = false,
}: SlideButtonProps) {
	return (
		<div className='item item--arow'>
			<a
				href={link}
				className={`cta ${ctaClass} ${bgColor} ${
					border ? borderColor : ''
				} ${textColor} hover:${bgColor} hover:${textColor}`}>
				{label}
			</a>
		</div>
	);
}
