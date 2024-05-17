import React, { useState, useEffect } from 'react';
import Header from './Header';
import './css/MonPokedex.css';

const MonPokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedPokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    setPokemons(savedPokemons);
  }, []);

  const handleRemovePokemon = (pokemonName) => {
    const confirmRemove = window.confirm(`Êtes-vous sûr de supprimer ${pokemonName} de votre Pokédex ?`);
    if (confirmRemove) {
      const updatedPokemons = pokemons.filter(pokemon => pokemon.name !== pokemonName);
      setPokemons(updatedPokemons);
      localStorage.setItem('pokemons', JSON.stringify(updatedPokemons));
    }
  };

  const handleClearPokedex = () => {
    const confirmClear = window.confirm("Êtes-vous sûr de vider votre Pokédex ?");
    if (confirmClear) {
      localStorage.removeItem('pokemons');
      setPokemons([]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokedex-container">
      <Header />
      <h1>Mon Pokédex</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un Pokémon"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="pokemon-list-container">
        {filteredPokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <div className="pokemon-details">
              <p><strong>Nom:</strong> {pokemon.name}</p>
              <p><strong>Numéro:</strong> {pokemon.id}</p>
              <p><strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
              
              <button className="remove-button" onClick={() => handleRemovePokemon(pokemon.name)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      <div className="center">
        <button className="clear-button" onClick={handleClearPokedex}>Vider le Pokédex</button>
      </div>
    </div>
  );
};

export default MonPokedex;
