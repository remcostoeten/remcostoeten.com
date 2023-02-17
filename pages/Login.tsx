import React, { useRef } from 'react';
import { auth } from '../firebase';

function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const register = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    };
const register = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    auth.createUserWithEmailAndPassword{
        emailRef.current.value,
        passwordRef.current.value
}
    }
};

const signIn = (e: { preventDefault: () => void }) => {
	e.preventDefault();
};

export default function Login() {
	return (
		<div className='signup'>
			<form>
				<h2>sign up</h2>
				<input ref={emailRef} placeholder='email' type='email' />
				<input
					ref={passwordRef}
					placeholder='password'
					type='password'
				/>
				<button type='submit' onClick={signIn}>
					Sign In
				</button>
				<input placeholder='email' type='email' />
			</form>
		</div>
	);
}
}
