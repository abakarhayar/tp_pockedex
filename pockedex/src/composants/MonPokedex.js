import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importer le composant de lien depuis React Router
import Header from './Header'; // Importer le composant Header

const MonPokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // Charger les données depuis le localStorage
    const savedPokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    setPokemons(savedPokemons);
  }, []);

  const handleRemovePokemon = (pokemonName) => {
    // Supprimer le Pokémon du localStorage
    const updatedPokemons = pokemons.filter(pokemon => pokemon.name !== pokemonName);
    setPokemons(updatedPokemons);
    localStorage.setItem('pokemons', JSON.stringify(updatedPokemons));
  };

  return (
    <div>
      <Header /> {/* Utilisation du composant Header */}
      <h1>Mon Pokédex</h1>
      <div className="pokemon-list-container"> {/* Utilisation d'une classe CSS pour le conteneur de liste */}
        {pokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card"> {/* Utilisation d'une classe CSS pour chaque carte de Pokémon */}
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" /> {/* Utilisation d'une classe CSS pour l'image */}
            <div className="pokemon-details"> {/* Utilisation d'une classe CSS pour les détails du Pokémon */}
              <p><strong>Nom:</strong> {pokemon.name}</p>
              <p><strong>Numéro:</strong> {pokemon.id}</p>
              <p><strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
              <button onClick={() => handleRemovePokemon(pokemon.name)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => localStorage.removeItem('pokemons')}>Vider le Pokédex</button>
    </div>
  );
};

export default MonPokedex;
