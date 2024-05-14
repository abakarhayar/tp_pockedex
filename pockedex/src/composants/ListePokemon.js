import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importer le composant de lien depuis React Router
import Header from './Header'; // Importer le composant Header
import './ListePokemon.css'; // Importer le fichier CSS pour les styles personnalisés

const ListePokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // État pour stocker le terme de recherche

  const fetchData = async (url) => {
    const response = await axios.get(url);
    const results = response.data.results;

    // Récupérer les détails de chaque Pokémon
    const detailedPokemons = await Promise.all(results.map(async (pokemon) => {
      const detailedResponse = await axios.get(pokemon.url);
      return detailedResponse.data;
    }));

    setPokemons(detailedPokemons);
    setNextPage(response.data.next);
    setPrevPage(response.data.previous);
  };

  useEffect(() => {
    fetchData('https://pokeapi.co/api/v2/pokemon');
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Mettre à jour le terme de recherche à chaque changement dans la barre de recherche
  };

  const addPokemonToPokedex = (pokemon) => {
    const savedPokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    const updatedPokemons = [...savedPokemons, pokemon];
    localStorage.setItem('pokemons', JSON.stringify(updatedPokemons));
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filtrer les Pokémon en fonction du terme de recherche

  return (
    <div>
      <Header /> {/* Utilisation du composant Header */}
      <h1>Liste des Pokémons</h1>
      <div className="search-container"> {/* Conteneur pour la barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher un Pokémon"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input" // Ajouter la classe pour les styles personnalisés
        />
      </div>
      <div className="pokemon-list-container"> {/* Utilisation d'une classe CSS pour le conteneur de liste */}
        {filteredPokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card"> {/* Utilisation d'une classe CSS pour chaque carte de Pokémon */}
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" /> {/* Utilisation d'une classe CSS pour l'image */}
            <div className="pokemon-details"> {/* Utilisation d'une classe CSS pour les détails du Pokémon */}
              <p><strong>Nom:</strong> {pokemon.name}</p>
              <p><strong>Numéro:</strong> {pokemon.id}</p>
              <p><strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
              <button onClick={() => addPokemonToPokedex(pokemon)}>Ajouter au Pokédex</button> 
              <button><a href={`/pokemon/${pokemon.name}`}>Voir le détail</a></button>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        {prevPage && <button className="button" onClick={() => fetchData(prevPage)}>Page précédente</button>}
        {nextPage && <button className="button" onClick={() => fetchData(nextPage)}>Page suivante</button>}
      </div>
    </div>
  );
};

export default ListePokemon;
