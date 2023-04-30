import Link from 'next/link';

export default function OffcanvasMenuLinks(props) {
	const handleCloseMenu = props.handleCloseMenu;

	return (
		<div className='offcanvas-menu__menu'>
			<div className='offcanvas-menu__menu--tagline'>
				<h2 className='animate__flipInX'>Remco stoeten</h2>
				<p className='first'>
					<span>Aspiring to be more</span>
				</p>
				<p className='last'>
					than a <i>divjesschuiver</i>
				</p>
			</div>
			<ul className='offcanvas-menu__items'>
				<li className='flex align-middle' onClick={handleCloseMenu}>
					<Link href='/stripe-payment'>Stripe v1</Link>
					<div className='text-xs  h-5 font-semibold inline-block ml-2 py-1 px-2 uppercase rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1'>
						WiP
					</div>
				</li>
				<li className='flex align-middle' onClick={handleCloseMenu}>
					<Link href='/stripe-payment'>Stripe v2</Link>
					<div className='text-xs  h-5 font-semibold inline-block ml-2 py-1 px-2 uppercase rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1'>
						pink
					</div>
				</li>
				<li onClick={handleCloseMenu}>
					<Link href='/loaders'>Loaders</Link>
				</li>
				<li onClick={handleCloseMenu}>
					<Link href='/log'>Login </Link>
				</li>
			</ul>
		</div>
	);
}
