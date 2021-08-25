import React from 'react';
import Header from './components/Header';
import TinderCards from './components/TinderCards';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/App.css';

function App() {
  return (
    <div className="App">  
     {/* *** Header *** */}
     <Header />
     <Router>
      <Switch>
        <Route path = '/chat'>
          <h1>I am the chat page</h1>
        </Route>
        <Route path = '/'>
          <TinderCards />
        </Route>
      </Switch>
     </Router>
     {/* *** Tinder Cards *** */}
     {/* *** Buttons below tinder cards *** */}

     {/* *** Chat screen *** */}
     {/* *** Individual chat screen *** */}
    </div>
  );
}

export default App;
