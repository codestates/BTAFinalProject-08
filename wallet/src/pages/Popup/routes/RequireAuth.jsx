import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const userState = useAuth();
  const { auth, mnemonic } = userState;
  if (auth !== undefined && mnemonic === undefined) {
    return <Navigate to={'/sign-in'}></Navigate>;
  }
  if (auth === undefined && mnemonic === undefined)
    return <Navigate to={'/create'}></Navigate>;
  return auth && mnemonic && <Outlet />;
};

export default RequireAuth;
