import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="nav-container">
      
        <div className="nav-links">
          <button 
            className="nav-link"
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button 
            className="nav-link"
            onClick={() => navigate('/saved')}
          >
            Saved Users
          </button>
          
        </div>
      </nav>
    </header>
  );
}; 