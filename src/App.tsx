import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import userContext from './contexts/user-context';
import Home from './pages/Home';
import SignIn from './pages/signIn';
import SignOut from './pages/signOut';
import useAuthListener from './services/authListener';
import firebase from './lib/firebase';
import useUser from './services/useUser';
import AppUserContext from './contexts/app-user-context';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Sales from './pages/Sales';

function App() {

  const firebaseapp = firebase
  const { user } = useAuthListener()
  const appUser = useUser(user?.uid || null)

  return (
    <userContext.Provider value = { user } >
      <AppUserContext.Provider value = { appUser }>
        <div className="App">
          <Router>
            <Switch >
              <Route path='/' exact>
                <Dashboard />
              </Route>
              <Route path='/expense' exact>
                <Expenses />
              </Route>
              <Route path='/sale' exact>
                <Sales />
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
      </AppUserContext.Provider>
    </userContext.Provider>
    
  );
}

export default App;
