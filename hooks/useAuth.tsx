import { useEffect, useState } from "react";
import { authenticateUser } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks/reduxHooks";

const useAuth = () => {

  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {

    const localUser  = localStorage.getItem('user');
    const localToken = localStorage.getItem('token');
    
    if ( localToken && localUser )
      dispatch(authenticateUser({ token: localToken, user: JSON.parse(localUser) }));

  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if ( token && !isAuthenticated ) {
    setIsAuthenticated(true);
  };

  return { isAuthenticated, user };
};

export default useAuth;