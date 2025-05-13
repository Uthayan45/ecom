import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../../context/Auth/Auth';

export default function RedirectIfAuthenticated(props) {
  const { userToken } = useContext(authContext);

  if (userToken) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}
