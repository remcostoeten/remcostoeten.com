import { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Stack,
	FormControl,
	FormLabel,
	Box,
	Text,
} from '@chakra-ui/react';
import {
	auth,
	signInWithGoogle,
	createUserWithEmailAndPassword,
} from '@/utils/firebase';

const SignInButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleSignInClick = () => {
		setIsOpen(true);
	};

	const handleModalClose = () => {
		setIsOpen(false);
	};

	const handleSignUpModalClose = () => {
		setIsSignUpModalOpen(false);
	};

	const handleSignUpClick = () => {
		setIsSignUpModalOpen(true);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPassword(event.target.value);
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleSignInWithEmailAndPassword = async () => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
			handleModalClose();
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignUpWithEmailAndPassword = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			handleSignUpModalClose();
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignInWithGoogle = async () => {
		try {
			await signInWithGoogle();
			handleModalClose();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button onClick={handleSignInClick}>Sign in</Button>
			<Modal isOpen={isOpen} onClose={handleModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Sign in</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box textAlign='center' mb={4}>
							<Button
								variant='outline'
								colorScheme='teal'
								onClick={handleSignInWithGoogle}
								mr={2}>
								<i className='fab fa-google'></i> Sign in with
								Google
							</Button>
							<Button variant='outline' colorScheme='facebook'>
								<i className='fab fa-facebook-f'></i> Sign in
								with Facebook
							</Button>
						</Box>
						<Text textAlign='center'>or</Text>
						<Stack spacing={3} mt={4}>
							<FormControl id='email'>
								<FormLabel>Email address</FormLabel>
								<Input
									type='email'
									value={email}
									onChange={handleEmailChange}
								/>
							</FormControl>
							<FormControl id='password'>
								<FormLabel>Password</FormLabel>
								<Input
									type='password'
									value={password}
									onChange={handlePasswordChange}
								/>
							</FormControl>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button
							variant='ghost'
							mr={3}
							onClick={handleSignUpClick}>
							Not registered yet? Click here to sign up.
						</Button>
						<Button onClick={handleSignInWithEmailAndPassword}>
							Sign in
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal isOpen={isSignUpModalOpen} onClose={handleSignUpModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Sign up</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={3}>
							<FormControl id='name'>
								<FormLabel>Name</FormLabel>
								<Input
									type='text'
									value={name}
									onChange={handleNameChange}
								/>
							</FormControl>
							<FormControl id='email'>
								<FormLabel>Email address</FormLabel>
								<Input
									type='email'
									value={email}
									onChange={handleEmailChange}
								/>
							</FormControl>
							<FormControl id='password'>
								<FormLabel>Password</FormLabel>
								<Input
									type='password'
									value={password}
									onChange={handlePasswordChange}
								/>
							</FormControl>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button
							variant='ghost'
							mr={3}
							onClick={handleSignInClick}>
							Already have an account? Click here to sign in.
						</Button>
						<Button onClick={handleSignUpWithEmailAndPassword}>
							Sign up
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SignInButton;
