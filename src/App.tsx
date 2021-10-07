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
import NewExpense from './pages/NewExpense';
import NewSale from './pages/NewSale';
import Header from './components/Header';
import Navbar from './components/Navbar';
import New from './pages/New';
import NewBatch from './pages/NewBatch';

function App() {

  const firebaseapp = firebase    //initialize firebase
  const { user } = useAuthListener()
  const appUser = useUser(user?.uid || null)

  return (
    <userContext.Provider value = { user } >
      <AppUserContext.Provider value = { appUser }>
        <div className="App">
          <Router>
          <Header />
          <Navbar />
            <Switch >
              <Route path='/' exact>
                {user ? <Dashboard />  : <Home />   }
              </Route>
              <Route path='/new' exact>                
                {user ? <New />  : <Home />   }
              </Route>
              <Route path='/expense' exact>                
                {user  ? <NewExpense projects={appUser?.projects}/>  : <Home />   }
              </Route>
              <Route path='/sale' exact>                
                {user ? <NewSale projects={appUser?.projects} />  : <Home />   }
              </Route>
              <Route path='/batch' exact>                
                {user ? <NewBatch />  : <Home />   }
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
