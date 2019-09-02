import React from 'react';
import { Link } from 'react-router-dom';

export const Test: React.FC = () => {
  return (
    <div>
      <Link to="/login">Test Private Route</Link>
    </div>
  );
};
