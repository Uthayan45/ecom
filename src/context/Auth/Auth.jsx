import { createContext, useEffect, useState } from 'react';

export const authContext = createContext(null);

export default function AuthContextProvider(props) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setUserToken(localStorage.getItem('authToken'));
    }
  }, []);

  return (
    <authContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </authContext.Provider>
  );
}
