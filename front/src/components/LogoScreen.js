// LogoScreen.js
import React from 'react';
import logo from './logo.png';

const LogoScreen = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src={logo} alt="Logo" style={{ width: '50%' }} />
    </div>
  );
};

export default LogoScreen;
