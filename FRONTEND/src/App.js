import React from 'react';
import './App.css';
import { Home } from './Home';
import { MyModelUser } from './MyModelUser';
import { MyModelAdmin } from './MyModelAdmin';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import { Login } from './login';

function App() {
  const appStyle = {
    background: 'white',
  };

  const PrivateRoute = ({ render: RenderComponent, ...rest }) => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    return isLoggedIn ? (
      <RenderComponent {...rest} />
    ) : (
      <Navigate to="/admin" replace state={{ from: rest.location }} />
    );
  };

  return (
    <Router>
      <div className="App container" style={appStyle}>
      <h3 className="d-flex justify-content-center m-3">ezPC is the best</h3>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/admin">
                Admin
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/user">
                User
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Login />} />
          <Route
            path="/adminsuccessful"
            element={<PrivateRoute render={props => <MyModelAdmin {...props} />} />}
          />
          <Route path="/user" element={<MyModelUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
