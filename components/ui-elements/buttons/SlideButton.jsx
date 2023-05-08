import Link from 'next/link';
import { KeyboardBackspace } from '@mui/icons-material';

export default function SlideButton({
	icon: Icon,
	label,
	ctaClass,
	link = null,
	bgColor = 'bg-white',
	textColor = 'text-black',
	borderColor = 'border-gray-300',
}) {
	return (
		<div className={`item item--arrow ${borderColor} border-solid border`}>
			<div
				className={`cta ${ctaClass} ${bgColor} ${textColor} hover:${bgColor} hover:${textColor}`}>
				{link ? (
					<Link href={link}>
						<a className={textColor}>
							<KeyboardBackspace />
							{label}
						</a>
					</Link>
				) : (
					<>
						<KeyboardBackspace />
						{label}
					</>
				)}
			</div>
		</div>
	);
}
