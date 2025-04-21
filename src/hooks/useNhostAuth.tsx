import { useState, useEffect } from 'react';
import { useNhostClient } from '@nhost/react';
import { useAuth } from './useAuth';

const useNhostAuth = () => {
  const nhost = useNhostClient();
  const auth = nhost.auth; // Directly access auth without parentheses
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState(auth.getUser());

  useEffect(() => {
    if (isAuthenticated) {
      setUser(auth.getUser());
    } else {
      setUser(null);
    }

    const unsubscribe = auth.onAuthStateChanged((event) => {
      if (event === 'SIGNED_IN') {
        setUser(auth.getUser());
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [isAuthenticated]); // Remove `auth` from dependencies

  return {
    isAuthenticated,
    user,
  };
};

export default useNhostAuth;
