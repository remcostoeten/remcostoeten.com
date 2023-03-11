import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        return setUser(user);
      });

      return unsubscribe;
    }, []);

    useEffect(() => {
      if (user && user.email !== 'stoetenremco.rs@gmail.com') {
        router.push('/');
      }
    }, [user]);
    
    if (user && user.email === 'stoetenremco.rs@gmail.com') {
      return <WrappedComponent {...props} user={user} />;
    }
    
    return (
      <main className='container'>
        {[...Array(40)].map((_, index) => (
          <span key={`particle-${index}`} className='particle'>
            4
          </span>
        ))}
        {[...Array(10)].map((_, index) => (
          <span key={`particle-${index + 40}`} className='particle'>
            0
          </span>
        ))}
        <article className='content'>
          <p>Damnit stranger,</p>
          <p>You got lost in the <strong>404</strong> galaxy.</p>
          <p>
            <button>
              <Link href='/'>Go back to earth.</Link>
            </button>
          </p>
        </article>
      </main>
    );
  };

  return Wrapper;
};

export default withAuth;
