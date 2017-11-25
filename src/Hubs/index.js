import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './Hubs.css';
import List from './List';
import Edit from './Edit';

class Hubs extends Component {
  constructor(props) {
    super();
    this.match = props.match;
  }

  render() {
    return (
      <Router>
        <div className="Hubs">

          <ul>
            <li><Link to={`${this.match.url}/`}>View all Hubs</Link></li>
            <li><Link to={`${this.match.url}/new`}>New hub</Link></li>
          </ul>

          <hr/>

          <Route exact path={`${this.match.url}/`} component={List}/>
          <Route path={`${this.match.url}/new`} component={Edit}/>
          <Route path={`${this.match.url}/edit/:id`} component={Edit}/>
        </div>
      </Router>
    );
  }
}

export default Hubs;
