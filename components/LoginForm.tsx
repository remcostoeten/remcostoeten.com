import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle, createUserWithEmailAndPassword } from '@/utils/firebase';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { updateProfile } from '@firebase/auth';
import Confetti from 'react-confetti';
import { useSpring, animated } from 'react-spring';
const SuccessPopup = styled(animated.div)`
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const router = useRouter();

    const successPopupAnimation = useSpring({
        opacity: showSuccess ? 1 : 0,
        transform: showSuccess ? 'translateY(0%)' : 'translateY(-100%)',
        config: { duration: 300 },
    });

    const [confetti, setConfetti] = useState(false);

    useEffect(() => {
        if (showSuccess) {
            setConfetti(true);
            setTimeout(() => setConfetti(false), 3000);
        }
    }, [showSuccess]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user) {
                await updateProfile(user, { displayName: name });
                setShowSuccess(true);
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };



    return (
        <>
            {showSuccess && (
                     <>
            <SuccessPopup style={successPopupAnimation}>
              Account created successfully! Redirecting to the home page...
            </SuccessPopup>
            {confetti && <Confetti />}
          </>
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Sign up</button>
                <br />
                <button type="button" onClick={signInWithGoogle}>
                    Sign in with Google
                </button>
            </form>
        </>
    );
};

export default LoginForm;
