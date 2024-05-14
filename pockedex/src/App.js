import React, { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [buttonStates, setButtonStates] = useState(
    JSON.parse(localStorage.getItem('pokedex')) || {}
  );

  useEffect(() => {
    if (currentPage === 1) {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
        .then(response => response.json())
        .then(data => setPokemonData(data))
        .catch(error => setError(error));
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchPokemonDetailsArray = async () => {
      if (pokemonData) {
        const promises = pokemonData.results.map(pokemon => fetchPokemonDetails(pokemon.url));
        const pokemonDetailsArray = await Promise.all(promises);
        setPokemonDetails(pokemonDetailsArray);
        if (Object.keys(buttonStates).length === 0) {
          const newButtonStates = {};
          pokemonDetailsArray.forEach(pokemon => {
            newButtonStates[pokemon.id] = false;
          });
          setButtonStates(newButtonStates);
        }
      }
    };

    fetchPokemonDetailsArray();
  }, [pokemonData, buttonStates]);

  useEffect(() => {
    localStorage.setItem('pokedex', JSON.stringify(buttonStates));
  }, [buttonStates]);

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const id = url.split('/').slice(-2, -1)[0];
      return { ...data, id };
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      return null;
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handlePokedexButtonClick = (id) => {
    setButtonStates(prevButtonStates => ({
      ...prevButtonStates,
      [id]: !prevButtonStates[id]
    }));
  };

  const filteredPokemon = pokemonDetails.filter(pokemon =>
    pokemon && pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredPokemonForPokedex = filteredPokemon.filter(
    pokemon => buttonStates[pokemon.id]
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div style={{ backgroundColor: 'black', padding: '10px', marginBottom: '10px', textAlign: 'left' }}>
        <button onClick={() => goToPage(1)} style={{ fontSize: '20px', padding: '8px', margin: '5px', color: 'white', backgroundColor: 'black' }}>Accueil</button>
        <button onClick={() => goToPage(2)} style={{ fontSize: '20px', padding: '8px', margin: '5px', color: 'white', backgroundColor: 'black' }}>Pokédex</button>
        <button onClick={() => goToPage(3)} style={{ fontSize: '20px', padding: '8px', margin: '5px', color: 'white', backgroundColor: 'black' }}>Page 3</button>
      </div>
      <div>
        {currentPage === 1 && (
          <div>
            <div style={{ textAlign: 'center' }}>
              <input 
                type="text"
                placeholder="Rechercher sur l'accueil..."
                style={{width: '60%', height: '60px', fontSize: '27px', marginBottom: '10px'}}
                value={searchInput}
                onChange={handleInputChange}
              />
            </div>
            <h2>Liste des Pokémons</h2>
            {error && <p>Une erreur s'est produite lors de la récupération des données.</p>}
            {filteredPokemon.length > 0 && (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {filteredPokemon.map((pokemon) => (
                    <div key={pokemon.id} style={{ border: '1px solid black', padding: '10px', margin: '5px' }}>
                      <div><strong>Nom:</strong> {pokemon.name}</div>
                      <div><strong>Numéro:</strong> {pokemon.id}</div>
                      <div><strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</div>
                      <div style={{ textAlign: 'center' }}>
                        <img src={pokemon.sprites.front_default} alt={`Image de ${pokemon.name}`} />
                      </div>
                      <button onClick={() => handlePokedexButtonClick(pokemon.id)} style={{ width: '60%', marginTop: '-10px', fontSize: '16px', padding: '8px', backgroundColor: buttonStates[pokemon.id] ? 'yellow' : 'white', color: buttonStates[pokemon.id] ? 'black' : 'black' }}>
                        {buttonStates[pokemon.id] ? 'Pokédex' : ''}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {currentPage === 2 && (
          <div>
            <div style={{ textAlign: 'center' }}>
              <input 
                type="text"
                placeholder="Rechercher sur le Pokédex..."
                style={{width: '60%', height: '60px', fontSize: '27px', marginBottom: '10px'}}
                value={searchInput}
                onChange={handleInputChange}
              />
            </div>
            <h2>Liste des Pokémons dans mon Pokédex</h2>
            {error && <p>Une erreur s'est produite lors de la récupération des données.</p>}
            {filteredPokemonForPokedex.length > 0 && (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {filteredPokemonForPokedex.map((pokemon) => (
                    <div key={pokemon.id} style={{ border: '1px solid black', padding: '10px', margin: '5px' }}>
                      <div><strong>Nom:</strong> {pokemon.name}</div>
                      <div><strong>Numéro:</strong> {pokemon.id}</div>
                      <div><strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</div>
                      <div style={{ textAlign: 'center' }}>
                        <img src={pokemon.sprites.front_default} alt={`Image de ${pokemon.name}`} />
                      </div>
                      <button onClick={() => handlePokedexButtonClick(pokemon.id)} style={{ marginTop: '10px', fontSize: '16px', padding: '8px', backgroundColor: buttonStates[pokemon.id] ? 'yellow' : 'white', color: buttonStates[pokemon.id] ? 'black' : 'black' }}>
                        {buttonStates[pokemon.id] ? 'Pokédex' : ''}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {currentPage === 3 && (
          <div>
            <h1>Page 3</h1>
            {/* Contenu de la page 3 */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



