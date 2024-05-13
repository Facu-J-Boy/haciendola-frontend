import React, { useEffect } from 'react';
import styles from './Notification.module.css';
import {
  clearNotification,
  notificationState,
} from '../../redux/reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const Notification: React.FC<notificationState> = ({
  message,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
  });
  return (
    <div className={styles.notification}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
