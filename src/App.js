import React from 'react';
import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const refreshUser = () => {
      return fetch('/user')
        .then(response => response.json())
        .then(user => {
          setLoading(false);
          setUser(user);

          if (!user) {
            history.push('/login');
          }
        });
    };

    refreshUser();
    const intervalID = setInterval(refreshUser, 5000);

    return () => {
      clearInterval(intervalID);
    };
  }, [history, setUser, setLoading]);

  return (
    <div className="App">
      <h1>Definitely Secure Bank</h1>
      {loading && <p>Loading data...</p>}
      <Switch>
        <Route path="/login">
          <Login user={user} />
        </Route>
        <Route path="/">
          <Home user={user} setUser={setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
