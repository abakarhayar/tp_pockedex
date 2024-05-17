import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListePokemon from './composants/ListePokemon';
import MonPokedex from './composants/MonPokedex';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <ListePokemon />
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
