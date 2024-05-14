import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header'; // Importer le composant Header
import './PokemonDetail.css'; // Importer le fichier CSS pour les styles personnalisés

const PokemonDetail = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemon(response.data);
    };

    fetchData();
  }, [pokemonName]);

  const addPokemonToPokedex = (pokemon) => {
    const savedPokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
    const updatedPokemons = [...savedPokemons, pokemon];
    localStorage.setItem('pokemons', JSON.stringify(updatedPokemons));
  };

  return (
    <div>
      <Header /> {/* Ajouter le composant Header */}
      <div className="pokemon-detail">
        <h1>Détails du Pokémon {pokemonName}</h1>
        {pokemon && (
          <div>
            <p>Nom: {pokemon.name}</p>
            <p>Numéro: {pokemon.id}</p>
            <p>Types:</p>
            <ul>
              {pokemon.types.map((type, index) => (
                <li key={index}>{type.type.name}</li>
              ))}
            </ul>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        )}
      </div>
      <button onClick={() => addPokemonToPokedex(pokemon)}>Ajouter au Pokédex</button> 
    </div>
  );
};

export default PokemonDetail;
