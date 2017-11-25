import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Modules from './Modules';
import './App.css';

const Home = () => (
  <div>
    <h2>Hitnet kiosk administration interface</h2>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/modules">Modules</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/modules" component={Modules}/>
        </div>
      </Router>
    );
  }
}

export default App;
