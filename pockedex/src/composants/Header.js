import React from 'react';
import './css/Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="nav-links">
          <a href="/" className="nav-link">Page d'accueil</a>
          <a href="/pokedex" className="nav-link styled-link">Aller au Pokédex</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
