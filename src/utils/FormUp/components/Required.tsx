import React from 'react';
import styles from './required.module.css';

export const Required: React.FC<RequiredProps> = ({ hasLabel }) => {
  return (
    <>
      {hasLabel ? (
        <span className={styles.inputLabel_required} />
      ) : (
        <span className={styles.input_required} />
      )}
    </>
  );
};

interface RequiredProps {
  hasLabel: boolean;
}
