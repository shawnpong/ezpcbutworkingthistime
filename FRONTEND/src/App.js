// import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {MyModel} from './MyModel';
import {BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className = "App container">
      <h3 className = "d-flex justify-content-centre m-3">
        ezPC is the best
      </h3>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className = "navbar-nav">
          {/* <li className = "nav-item- m-1">
            <NavLink className = "btn btn-light btn-outline-primary" to = "/home">
              Home
            </NavLink>
          </li> */}
          <li className = "nav-item- m-1">
            <NavLink className = "btn btn-light btn-outline-primary" to = "/MyModel">
              MyModel
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path = "/home" element = {<Home />}/>
        <Route path = "/mymodel" element = {<MyModel />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
