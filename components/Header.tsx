import { Navbar, Dropdown, Button, Link, Text } from '@nextui-org/react';
import UnderConstruction from '@/components/layout/UnderConstruction';

function Header() {
	return;
	<Navbar isBordered variant='sticky'>
		<Navbar.Brand></Navbar.Brand>
		<Navbar.Content
			enableCursorHighlight
			activeColor='secondary'
			hideIn='xs'
			variant='underline'>
			<Navbar.Link isActive href='#'>
				Customers
			</Navbar.Link>
			<Navbar.Link href='#'>Pricing</Navbar.Link>
			<Navbar.Link href='#'>Company</Navbar.Link>
		</Navbar.Content>
		<Navbar.Content>
			<Navbar.Link color='inherit' href='#'>
				Login
			</Navbar.Link>
			<Navbar.Item>
				<Button auto flat as={Link} href='#'>
					Sign Up
				</Button>
			</Navbar.Item>
		</Navbar.Content>
	</Navbar>;
}

export default Header;
