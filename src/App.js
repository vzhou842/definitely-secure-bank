import React from 'react';
import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Spinner from 'react-bootstrap/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div className="header">
        <img alt="The DSB logo" src="/dsb.svg" width={48} height={48} />
        <h1>Definitely Secure Bank</h1>
      </div>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Switch>
        <Route path="/login">
          <Login user={user} />
        </Route>
        <Route path="/">
          <Home user={user} setUser={setUser} />
        </Route>
      </Switch>
      <div className="footer">
        <p>
          Built by{' '}
          <a href="https://victorzhou.com" target="_blank">
            Victor Zhou
          </a>{' '}
          for demo purposes.
        </p>
        <p>
          See the source code on{' '}
          <a
            href="https://github.com/vzhou842/definitely-secure-bank"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default App;
