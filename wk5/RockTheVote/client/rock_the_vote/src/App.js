import React, {useContext} from 'react'
import './App.css';
import Auth from './components/Auth'
import {UserContext} from './context/UserProvider'
import {Switch, Route, Redirect} from 'react-router-dom'
import Profile from './components/Profile'
import Navbar from './components/Navbar'

function App() {
  const {token} = useContext(UserContext)
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route 
          exact path = '/'
          render={()=> token ? <Redirect to='/profile' /> : <Auth/>}
        />
        <Route
          path='/profile'
          render={()=> token ? <Profile /> : <Auth/>}
        />
      </Switch>
      
    </div>
  );
}

export default App;
