import React, {useContext} from 'react'
import './App.css';
import Auth from './components/Auth'
import {UserContext} from './context/UserProvider'
import {Switch, Route, Redirect} from 'react-router-dom'
import Public from './components/Public'
import Navbar from './components/Navbar'
import Profile from './components/Profile'

function App() {
  const {token} = useContext(UserContext)
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route 
          exact path = '/'
          render={()=> token ? <Redirect to='/public' /> : <Auth/>}
        />
        <Route
          path='/public'
          render={()=> token ? <Public /> : <Auth/>}
        />
        <Route
          path='/profile'
          render={()=> token ? <Profile /> : <Auth />}
        />
      </Switch>
      
    </div>
  );
}

export default App;
