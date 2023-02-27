import { useEffect, useState } from 'react';
import { Redirect, useNavigate, useParams } from "react-router-dom";
// import useToast from './useToast';

export const useAuthentication = () => {
  const navigate = useNavigate();
  // const [toastSuccess] = useToast();
  const [user, setUser] = useState(window.localStorage.getItem('user'));
  const [isAuthenticated, setisAuthenticated] = useState(window.localStorage.getItem('user') !== null);
  // const [mountedComponent, setMountedComponent] = useState(false);
  // const setMode = user => {};

  const authLogin = (userData) => {
    alert("authLogin authLogin");
    navigate(`/dashboard`);
    window.localStorage.setItem('user', userData);
  };

  const authLogout = () => {
    window.localStorage.removeItem('user');
    // toastSuccess();
    navigate(`/login`);
  };

  useEffect(() => {
    // setUser(user); 
    // setMountedComponent(true)
  }, [user, isAuthenticated]);

  return [user, isAuthenticated, authLogin, authLogout];
  // return [user, authLogin, authLogout, mountedComponent];
}; 