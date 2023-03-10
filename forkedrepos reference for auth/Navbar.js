import {
	Flex,
	Heading,
	Box,
	Button,
	Text,
	IconButton,
	Stack,
	Menu,
	Avatar,
	useColorModeValue,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	MenuGroup,
} from '@chakra-ui/react';
import { ExternalLinkIcon, QuestionOutlineIcon } from '@chakra-ui//icons';

function Navbar({ username, auth, user, logout, singInWithGoogle }) {
	return (
		<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
			{/* <Heading id="welcomeText">{username}</Heading> */}
			{/* Welcome back, Virej Dasani (👆) */}

			<Flex alignItems={'center'}>
				<Menu>
					<Flex justify='space-between' w='100%' align='center'>
						<Flex>
							<MenuButton
								as={IconButton}
								aria-label='Options'
								icon={<QuestionOutlineIcon />}
								variant='ghost'
								ml={2}
								mr={2}
							/>
							<MenuList>
								<MenuItem
									onClick={() =>
										window.open(
											'https://virejdasani.github.io/',
											'_blank',
										)
									}
									icon={<ExternalLinkIcon />}>
									Developed by Virej Dasani
								</MenuItem>
								<MenuItem
									onClick={() =>
										window.open(
											'https://github.com/virejdasani/Dailymoji',
											'_blank',
										)
									}
									icon={<ExternalLinkIcon />}>
									Dailymoji on GitHub
								</MenuItem>
								<MenuItem
									onClick={() =>
										window.open(
											'https://linktr.ee/Virejdasani',
											'_blank',
										)
									}
									icon={<ExternalLinkIcon />}>
									Follow my socials {'<'}3
								</MenuItem>
								<MenuItem
									onClick={() =>
										window.open(
											'mailto:dasanivirej@gmail.com',
											'_blank',
										)
									}
									icon={<ExternalLinkIcon />}>
									Contact the developer
								</MenuItem>
							</MenuList>
						</Flex>
					</Flex>

					<Flex alignItems={'center'} ml={3}>
						<Menu>
							<MenuButton
								as={Button}
								rounded={'full'}
								variant={'link'}
								cursor={'pointer'}
								minW={0}>
								<Avatar
									size={'sm'}
									src={
										auth.currentUser &&
										auth.currentUser.photoURL
											? auth.currentUser.photoURL
											: ''
									}
								/>
							</MenuButton>
							<MenuList>
								<MenuGroup
									title={
										auth.currentUser &&
										auth.currentUser.displayName
											? 'Logged in as ' +
											  auth.currentUser.displayName
											: 'Welcome to Dailymoji!'
									}>
									<MenuItem
										onClick={
											auth.currentUser &&
											auth.currentUser.displayName
												? logout
												: singInWithGoogle
										}
										color='inherit'>
										{auth.currentUser &&
										auth.currentUser.displayName ? (
											<p>Logout</p>
										) : (
											<p>Login with Google</p>
										)}
									</MenuItem>
								</MenuGroup>
							</MenuList>
						</Menu>
					</Flex>
				</Menu>
			</Flex>
		</Flex>
	);
}

export default Navbar;
