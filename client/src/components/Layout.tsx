import React from 'react';
import { Header } from './Header';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div className="app">
      <Header />
      <main className="main-content">
          {children}
      </main>
    </div>
  );
}; 