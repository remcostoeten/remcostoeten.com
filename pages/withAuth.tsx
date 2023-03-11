import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';

interface User {
  email: string;
}

interface Props {
  // define any props that your wrapped component accepts
  user: User;
}

const withAuth = <P extends Props>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });

      return unsubscribe;
    }, []);

    useEffect(() => {
      if (user && user.email !== 'stoetenremco.rs@gmail.com') {
        router.push('/');
      }
    }, [user]);
    return user && user.email === 'stoetenremco.rs@gmail.com' ? (
      <WrappedComponent {...props} user={user} />
    ) : (
     
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
          <button>									<Link href='/'>Go back to earth.</Link>
</button>
        </p>
      </article>
    </main>
    );
  };

  return Wrapper;
};

export default withAuth;
