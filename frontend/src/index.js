import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Adjust the import path if needed
// import './index.css'; // Import your global CSS file if you have one

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);