import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'utils/firebase';

const SignUpModal = ({ open, handleClose }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signUpWithEmailPassword = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await user.updateProfile({ displayName: name });
      handleClose();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative p-6 w-80 max-w-md bg-white shadow-lg rounded-md">
        <input
          className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="block w-full py-2 mb-2 font-bold text-white bg-blue-600 rounded-md"
          onClick={signUpWithEmailPassword}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
