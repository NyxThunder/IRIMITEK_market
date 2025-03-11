import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { load_UserProfile } from '../../actions/userAction';
import IrimiLoader from '../layouts/loader/Loader';

function PrivateRoute({ isAdmin, component: Component, ...rest }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_UserProfile());
  }, [dispatch]);

  if (loading) {
    return <IrimiLoader />; // Loading state
  }

  // If the user is not authenticated, redirect to login page
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // If the user is not an admin and is trying to access an admin route, redirect
  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  // If all conditions are passed, render the component
  return <Component {...rest} />;
}

export default PrivateRoute;
