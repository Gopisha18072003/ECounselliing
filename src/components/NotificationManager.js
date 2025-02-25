import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../store/uiSlice';  // Adjust path as needed

function NotificationManager() {
  const successNotification = useSelector((state) => state.ui.successNotification);
  const errorNotification = useSelector((state) => state.ui.errorNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (successNotification) {
      const timer = setTimeout(() => {
        dispatch(uiActions.hideSuccessNotification());
      }, 3000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [successNotification, dispatch]);

  useEffect(() => {
    if (errorNotification) {
      const timer = setTimeout(() => {
        dispatch(uiActions.hideErrorNotification());
      }, 3000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [errorNotification, dispatch]);

  return null; // This component doesn't need to render anything
}

export default NotificationManager;
