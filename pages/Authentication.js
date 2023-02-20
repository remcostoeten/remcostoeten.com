import React, { useState, useEffect } from 'react';
import Navbar from '../comps/Navbar';
import moment from 'moment';
import { Flex, Box, Button, Text, Heading, Image } from '@chakra-ui/react';
import EmojiCard from '../comps/EmojiCard';
import EmojiPanel from '../comps/EmojiPanel';
import Footer from '../comps/Footer';
import { auth, db, singInWithGoogle, logout } from '../firebase';

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
		<div className='container page-wrapper'>
			<h1>Welcome {displayUserName()}</h1>
			<Navbar
				username={
					auth.currentUser && auth.currentUser.displayName
						? 'Welcome back, ' + auth?.currentUser.displayName
						: ''
				}
				user={user}
				logout={logout}
				singInWithGoogle={singInWithGoogle}
				auth={auth}
			/>
			{isLoggedIn ? <h2>Logged in</h2> : <h3>Not loggedin</h3>}
			{auth.currentUser ? (
				<>
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
						px={4}></Flex>
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
	);
}

export default App;
