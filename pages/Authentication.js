import React, { useState, useEffect } from 'react';
import Navbar from '../comps/Navbar';
import moment from 'moment';
import { Flex, Box, Button, Text, Heading, Image } from '@chakra-ui/react';
import EmojiCard from '../comps/EmojiCard';
import EmojiPanel from '../comps/EmojiPanel';
import Footer from '../comps/Footer';
import { auth, db, singInWithGoogle, logout } from '../firebase';
import Header from '../components/header/Header';
function App() {
	const [emojiData, setEmojiData] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [show, setShow] = useState(true);
	const isLoggedIn = auth.currentUser;
	const displayUserName = () => auth?.currentUser?.displayName;

	useEffect(() => {
		const timeId = setTimeout(() => {
			setShow(false);
		}, 1000);

		return () => {
			clearTimeout(timeId);
		};
	}, [show]);

	return (
		<>
			<Header />
			<div className='App'>
				<Flex position='fixed' top='0' w='100%'>
					<Navbar
						username={
							auth.currentUser && auth.currentUser.displayName
								? 'Welcome back, ' +
								  auth?.currentUser.displayName
								: ''
						}
						user={user}
						logout={logout}
						singInWithGoogle={singInWithGoogle}
						auth={auth}
					/>
				</Flex>

				{/* test code here */}
				{show ? (
					<Flex
						flexDir='column'
						maxW={800}
						align='center'
						mx='auto'
						px={4}>
						<Flex
							position='fixed'
							left='10px'
							top='80px'
							zIndex={9}></Flex>
					</Flex>
				) : (
					''
				)}

				{auth.currentUser ? (
					<>
						<Flex
							flexDir='column'
							maxW={800}
							align='center'
							mx='auto'
							px={4}
							mt={24}
							mb={4}>
							<Heading
								fontFamily="'Work Sans', sans-serif"
								id='dateText'
								fontWeight='400'
								fontSize={'4xl'}>
								{moment().format('MMMM D, YYYY')}
							</Heading>
						</Flex>
						<Flex
							flexDir='column'
							maxW={800}
							align='center'
							mx='auto'
							px={4}
							mb='250px'>
							{emojiData.map((emoji, index) => (
								<EmojiCard
									emoji={emoji.emoji}
									emojiContext={emoji.emojiContext}
									timestamp={emoji.timestamp}
									key={emoji.id}
									id={emoji.id}
									deleteEmoji={deleteEmoji}
									sendContextData={sendContextData}
								/>
							))}
						</Flex>
						<Flex
							flexDir='column'
							maxW={800}
							align='center'
							mx='auto'
							px={4}>
							<Flex position='fixed' bottom='30px' zIndex={9}>
								<EmojiPanel sendEmojiData={sendEmojiData} />
							</Flex>
						</Flex>
					</>
				) : (
					<>
						<Flex
							flexDir='column'
							maxW={800}
							align='center'
							mx='auto'
							px={4}
							mt={20}>
							<Button
								onClick={user ? logout : singInWithGoogle}
								my={7}
								mb={12}>
								{auth.currentUser &&
								auth.currentUser.displayName ? (
									<p>Logout</p>
								) : (
									<p>Sign in with Google</p>
								)}
							</Button>

							<Flex
								flexDir='column'
								maxW={800}
								align='center'
								mx='auto'
								px={4}
								mt={20}></Flex>
						</Flex>
						<Footer />
					</>
				)}
			</div>
		</>
	);
}

export default App;
