import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './css/ListePokemon.css';

const ListePokemon = () => {
  const [originalPokemons, setOriginalPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pokedexPokemons, setPokedexPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetchData('https://pokeapi.co/api/v2/pokemon');
    const savedPokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    setPokedexPokemons(savedPokemons);
  }, []);

  const fetchData = async (url) => {
    const response = await axios.get(url);
    const results = response.data.results;

    const promises = results.map((pokemon) => axios.get(pokemon.url));
    const detailedResponses = await Promise.all(promises);
    const detailedPokemons = detailedResponses.map((response) => response.data);

    setOriginalPokemons(detailedPokemons);
    setPokemons(detailedPokemons);
    setNextPage(response.data.next);
    setPrevPage(response.data.previous);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPokemons = originalPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
    setPokemons(filteredPokemons);
    setSearchTerm(event.target.value);
  };

  const addPokemonToPokedex = (pokemon) => {
    const savedPokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    const maxLocalStorageSize = 5 * 1024 * 1024;

    const pokemonSize = JSON.stringify(pokemon).length;
    let currentLocalStorageSize = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      currentLocalStorageSize += key.length + localStorage.getItem(key).length;
    }

    if (currentLocalStorageSize + pokemonSize > maxLocalStorageSize) {
      alert('Le stockage local est plein. Veuillez supprimer des Pokémon avant d\'en ajouter de nouveaux.');
    } else if (pokedexPokemons.find((p) => p.id === pokemon.id)) {
      alert(`Le Pokémon ${pokemon.name} existe déjà dans votre Pokédex.`);
    } else {
      const updatedPokemons = [...savedPokemons, pokemon];
      localStorage.setItem('pokemons', JSON.stringify(updatedPokemons));
      setPokedexPokemons(updatedPokemons);
    }
  };

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div>
      <Header />
      <h1>Liste des Pokémons</h1>
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
        {pokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <div className="pokemon-details">
              <p><strong>Nom:</strong> {pokemon.name}</p>
              <p><strong>Numéro:</strong> {pokemon.id}</p>
              <p><strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
              <button className="add-button" onClick={() => addPokemonToPokedex(pokemon)}>Ajouter au Pokédex</button>
              <button className="detail-button" onClick={() => openModal(pokemon)}>Voir le détail</button>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        {prevPage && <button className="button" onClick={() => fetchData(prevPage)}>Page précédente</button>}
        {nextPage && <button className="button" onClick={() => fetchData(nextPage)}>Page suivante</button>}
      </div>
      {selectedPokemon && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 style={{ color: '#ff4500' }}>Détail du Pokémon</h2>
            <p><strong>Nom:</strong> {selectedPokemon.name}</p>
            <p><strong>Numéro:</strong> {selectedPokemon.id}</p>
            <p><strong>Types:</strong> {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Poids:</strong> {selectedPokemon.weight}</p>
            <p><strong>Taille:</strong> {selectedPokemon.height}</p>
            <p><strong>Poids:</strong> {selectedPokemon.weight}</p>
            <p><strong>Expérience de base:</strong> {selectedPokemon.base_experience}</p>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} className="pokemon-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListePokemon;
