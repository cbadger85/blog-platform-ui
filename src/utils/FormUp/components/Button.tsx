import React from 'react';

export const Button: React.FC<ButtonProps> = props => {
  return <button {...props} />;
};

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: string;
}
