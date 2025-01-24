import React from 'react';
import LogoutButton from '../components/LogoutButton';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
      <LogoutButton />
    </div>
  );
};

export default Home;
