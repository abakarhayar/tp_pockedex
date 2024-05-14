import React from 'react';
import { Link } from 'react-router-dom'; // Importer le composant de lien depuis React Router
import './Header.css'; // Importer le fichier CSS pour les styles personnalisés du Header

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="nav-links">
          <a href="/" className="nav-link">Page d'accueil</a> {/* Utilisation de Link pour naviguer vers la page d'accueil */}
          <a href="/pokedex" className="nav-link styled-link">Aller au Pokédex</a> {/* Utilisation de Link pour naviguer vers le Pokédex avec un style personnalisé */}
        </div>
      </div>
    </div>
  );
};

export default Header;
