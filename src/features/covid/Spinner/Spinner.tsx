import React from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './Spinner.module.css';

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinnerverRay}>
      <div className={styles.spinnerWrap}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Spinner;
