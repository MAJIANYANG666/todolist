// HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to TodoList App</h1>
      <ul>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </div>
  );
};

export default HomePage;
