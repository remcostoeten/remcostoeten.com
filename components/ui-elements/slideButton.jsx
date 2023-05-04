export default function SlideButton({
	icon: Icon,
	label,
	ctaClass,
	link = null,
}) {
	return (
		<div className='item item--arrow'>
			<div className={`cta ${ctaClass}`}>
				{link ? (
					<Link href={link}>
						{Icon && <Icon />}
						{label}
					</Link>
				) : (
					<>
						{Icon && <Icon />}
						{label}
					</>
				)}
			</div>
		</div>
	);
}
