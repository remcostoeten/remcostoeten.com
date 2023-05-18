import React from 'react';
import { singInWithGoogle } from '@/utils/firebase';

const Login = () => {
  const handleGoogleSignIn = () => {
    singInWithGoogle();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold">Sign in</h1>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
