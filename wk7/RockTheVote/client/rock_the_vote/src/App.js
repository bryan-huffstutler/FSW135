import React, { useContext } from 'react'
import './App.css';
import Auth from './components/Auth'
import { UserContext } from './context/UserProvider'
import { Switch, Route, Redirect } from 'react-router-dom'
import Public from './components/Public'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  const { token } = useContext(UserContext)
  return (
    <div id='app'>
      <Navbar />
      <Switch>
        <Route
          exact path='/'
          render={() => token ? <Redirect to='/public' /> : <Auth />}
        />
        <ProtectedRoute
          path='/public'
          component={Public}
          redirectTo="/"
          token={token}
        />
        <ProtectedRoute
          path='/profile'
          component={Profile}
          redirectTo="/"
          token={token}
        />
      </Switch>

    </div>
  );
}

export default App;
