// import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {MyModelUser} from './MyModelUser';
import {MyModelAdmin} from './MyModelAdmin';
import {HashRouter as Router, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  const appStyle = {
    background: 'white',
  };
  return (
    <Router>
    <div className = "App container" style={appStyle}>
      <h3 className = "d-flex justify-content-centre m-3">
        ezPC is the best
      </h3>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className = "navbar-nav">
        <li className = "nav-item- m-1">
          <NavLink className = "btn btn-light btn-outline-primary" to = "/home">
              Home
            </NavLink>
          </li>
          <li className = "nav-item- m-1">
          <NavLink className = "btn btn-light btn-outline-primary" to = "/admin">
              Admin
            </NavLink>
          </li>
          <li className = "nav-item- m-1">
            <NavLink className = "btn btn-light btn-outline-primary" to = "/user">
              User
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/home" element = {<Home />}/>
        <Route path = "/admin" element = {<MyModelAdmin />}/>
        <Route path = "/user" element = {<MyModelUser />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
