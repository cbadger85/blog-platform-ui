import React from 'react';
import styles from './button.module.css';

export const Button: React.FC<ButtonProps> = ({
  className = '',
  color = 'primary',
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[color]} ${className}`}
      {...props}
    />
  );
};

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: 'primary' | 'info' | 'warn' | 'danger';
}
