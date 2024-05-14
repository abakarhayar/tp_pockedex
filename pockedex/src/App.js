import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListePokemon from './composants/ListePokemon';
import PokemonDetail from './composants/PokemonDetail';
import MonPokedex from './composants/MonPokedex';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <ListePokemon />
          </Route>
          <Route path="/pokemon/:pokemonName">
            <PokemonDetail />
          </Route>
          <Route path="/pokedex/:pokemonName">
            <PokemonDetail />
          </Route>
          <Route path="/pokedex">
            <MonPokedex />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
