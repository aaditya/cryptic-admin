import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import './App.css';

import Dashboard from './components/Dashboard';
import Splash from './views/Splash';

function App() {
  let [logged, setLogged] = useState(false);
  let authUser = useSelector(state => state.authUser);
  let existingToken = localStorage.getItem('access_token');
  
  useEffect(() => {
    setLogged(!!authUser || !!existingToken);
  }, [authUser, existingToken])
  
  return (
    <Router>
      <div className="App">
        {!logged ? (
          <Route render={() => <Splash />} />
        ) : (
          <Dashboard />
        )}
      </div>
    </Router>
  );
}

export default App;
