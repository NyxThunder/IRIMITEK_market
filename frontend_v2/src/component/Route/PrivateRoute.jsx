import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { load_UserProfile } from '../../actions/userAction';
import IrimiLoader from '../layouts/loader/Loader';

const PrivateRoute = ({ isAdmin = false }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_UserProfile());
  }, [dispatch]);

  if (loading) {
    return <IrimiLoader />; // Show loader while fetching user data
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
