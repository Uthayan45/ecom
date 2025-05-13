import { Navigate } from 'react-router-dom';
import { authContext } from '../../context/Auth/Auth';
import { useContext } from 'react';

export default function ProtectedRoute(props) {
  const { userToken } = useContext(authContext);

  if (userToken) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
