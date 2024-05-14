import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './css/ListePokemon.css';

const ListePokemon = () => {
  const [originalPokemons, setOriginalPokemons] = useState([]); // State to store the original list of Pokémons
  const [pokemons, setPokemons] = useState([]); // State to store the filtered list of Pokémons
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pokedexPokemons, setPokedexPokemons] = useState([]);

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

    setOriginalPokemons((prevOriginalPokemons) => [...prevOriginalPokemons, ...detailedPokemons]); // Update originalPokemons with combined list

    setPokemons((prevPokemons) => [...prevPokemons, ...detailedPokemons]); // Update pokemons with combined list

    setNextPage(response.data.next);
    setPrevPage(response.data.previous);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredPokemons = originalPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );

    setPokemons(filteredPokemons); // Update the filtered list of Pokémons
    setSearchTerm(event.target.value); // Update the search term
  };

  const addPokemonToPokedex = (pokemon) => {
    const savedPokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    const maxLocalStorageSize = 5 * 1024 * 1024; // Taille maximale du stockage local en octets (5 Mo)

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
              <a href={`/pokemon/${pokemon.name}`}><button className="detail-button">Voir le détail</button></a>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        {prevPage && <button className="button" onClick={() => fetchData(prevPage)}>Précédent</button>}
        {nextPage && <button className="button" onClick={() => fetchData(nextPage)}>Suivante</button>}
      </div>
    </div>
  );
};

export default ListePokemon;
