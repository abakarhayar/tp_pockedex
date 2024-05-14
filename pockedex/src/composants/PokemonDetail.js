import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import Header from './Header';
import './css/PokemonDetail.css';

const PokemonDetail = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const location = useLocation();

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

  const isFromPokedex = location.pathname.includes('/pokedex');

  return (
    <div>
      <Header />
      <div className="pokemon-detail">
        {pokemon && (
          <div className="pokemon-card">
            <div className="pokemon-image-container">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            </div>
            <h1 className="pokemon-name">{pokemon.name}</h1>
            <div className="pokemon-info">
              <div className="pokemon-details">
                <p><strong>Numéro:</strong> {pokemon.id}</p>
                <p><strong>Types:</strong></p>
                <ul>
                  {pokemon.types.map((type, index) => (
                    <li key={index}>{type.type.name}</li>
                  ))}
                </ul>
                <p><strong>Statistiques:</strong></p>
                <ul>
                  {pokemon.stats.map((stat, index) => (
                    <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                  ))}
                </ul>
                <p><strong>Capacités:</strong></p>
                <ul>
                  {pokemon.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                  ))}
                </ul>
                <p><strong>Taille:</strong> {pokemon.height}</p>
                <p><strong>Poids:</strong> {pokemon.weight}</p>
                <p><strong>Expérience de base:</strong> {pokemon.base_experience}</p>
              </div>
            </div>
            {!isFromPokedex && (
              <button onClick={() => addPokemonToPokedex(pokemon)}>Ajouter au Pokédex</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
