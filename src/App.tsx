import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
                {user ? <Dashboard />  : <Home />   }
              </Route>
              <Route path='/expense' exact>                
                {user  ? <Expenses />  : <Home />   }
              </Route>
              <Route path='/sale' exact>                
                {user ? <Sales />  : <Home />   }
              </Route>
              <Route path='/sign-in' exact>
                {!user ? <SignIn /> : <Dashboard />}
              </Route>
              <Route path='/sign-out'>
                {user  ? <SignOut />  : <Home />   }
              </Route>
            </Switch>
          </Router>
        </div>
      </AppUserContext.Provider>
    </userContext.Provider>
    
  );
}

export default App;
