import React from 'react';
import styles from './NotFound.module.css';

const NotFound: React.FC<{ message: string }> = ({
  message,
}): JSX.Element => {
  return (
    <div className={styles.container}>
      <h1>{message}</h1>
    </div>
  );
};

export default NotFound;
