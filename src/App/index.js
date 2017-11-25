import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Modules from '../Modules';
import Hubs from '../Hubs';
import Header from './Header';
import './App.css';
import './AppLayout.css';
import mapImg from './hitnet-map.jpg';

const Home = () => (
  <div>
    <div className="title">
      <h1>Hitnet Hub Management</h1>
    </div>
    <div className="container">
      <div className="content">
        <img src={mapImg} alt="Hitnet hubs spread across Australia" />
      </div>
    </div>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Route exact path="/" component={Home}/>
            <Route path="/modules" component={Modules}/>
            <Route path="/hubs" component={Hubs}/>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
