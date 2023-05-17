import Link from 'next/link';
import { Pills } from './Pills';

export default function OffcanvasMenuLinks(props) {
	const handleCloseMenu = props.handleCloseMenu;

	const getRandomBlobClass = () => {
		const randomNumber = Math.floor(Math.random() * items.length) + 1;
		return `blob${randomNumber}`;
	};

	const items = [
		{
			label: 'Task kanban board',
			href: '/tasks',
			pills: (
				<>
					<Pills className="w-10" variant="tool" text="Tool" />
					<Pills variant="showcase" text="Showcase" />
				</>
			),
		},
		{
			label: 'Text extractor tool',
			href: '/url-filtering-tool',
			pills: <Pills variant="tool" text="Tool" />,
		},
		{
			label: 'Chat export',
			href: '/chat-export',
			pills: <Pills variant="upcoming" text="Showcase" />,
		},
		{
			label: 'Login',
			href: '/log',
			pills: <Pills variant="wip" text="Work in progress" />,
		},
		{
			label: 'Stripe payment',
			href: '/product',
			pills: <Pills variant="wip" text="Work in progress" />,
		},
		{
			label: 'WebGL experiments',
			href: '/3d-experiments',
			pills: (
				<>
					<Pills variant="experiment" text="Experiment" />
					<Pills variant="showcase" text="Showcase" />
				</>
			),
		},
	];

	const handleItemClick = () => {
		handleCloseMenu(); // Close the menu
	};

	return (
		<ul className="offcanvas-menu__items">
			{items.map((item, index) => (
				<li
					className={`mb-5 md:mb-4 flex items-center relative animate__animated animate__fadeInUp`}
					onClick={handleItemClick}
					clicked
					key={item.href}
					value={item.wip}
					style={{ animationDelay: `${index * 200}ms` }}
				>
					<Link
						href={item.href || `${baseUrl}/`}
						className="text-lg menu-item md:text-xl text-off-white"
					>
						{item.label}
					</Link>

					{item.pills}

					<div
						className={`absolute top-0 right-0 bottom-0 left-0 z-0 blob ${getRandomBlobClass()}`}
					></div>
				</li>
			))}
		</ul>
	);
}
