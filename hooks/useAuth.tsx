import { useState } from "react";
import { useAppSelector } from "../utils/hooks/reduxHooks";

const useAuth = () => {

  const { token, user } = useAppSelector((state) => state.auth);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if ( token ) {
    setIsAuthenticated(true);
  };

  return { isAuthenticated, user };
};

export default useAuth;