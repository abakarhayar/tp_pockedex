// PokemonListPage.js

import React, { useState, useEffect } from 'react';

function PokemonListPage() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(data => setPokemons(data.results));
    }, []);

    return (
        <div>
            <h1>Liste des Pokémons</h1>
            <ul>
                {pokemons.map((pokemon, index) => (
                    <li key={index}>
                        {pokemon.name}
                        {/* Ajoutez ici le numéro, le type(s) et l'image du Pokémon */}
                        <button>Ajouter au Pokédex</button>
                    </li>
                ))}
            </ul>
            {/* Ajoutez ici les boutons pour naviguer entre les pages de Pokémons */}
        </div>
    );
}

export default PokemonListPage;
