import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import userContext from './contexts/user-context';
import Home from './pages/Home';
import SignIn from './pages/signIn';
import SignOut from './pages/signOut';
import useAuthListener from './services/authListener';
import firebase from './lib/firebase';

function App() {

  const firebaseapp = firebase
  const { user } = useAuthListener()

  return (
    <userContext.Provider value = {{ user }} >
      <div className="App">
        <Router>
          <Switch >
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/sign-in' exact>
              <SignIn />
            </Route>
            <Route path='/sign-out'>
              <SignOut />
            </Route>
          </Switch>
        </Router>
      </div>
    </userContext.Provider>
    
  );
}

export default App;
