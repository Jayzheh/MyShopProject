// useAuthToken.js
import { useEffect, useState } from 'react';

function useAuthToken() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return token;
}

export default useAuthToken;
