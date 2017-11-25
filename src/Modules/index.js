import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import path from 'path';
import './Modules.css';
import List from './List';
import Edit from './Edit';

class Modules extends Component {
  constructor(props) {
    super();
    this.match = props.match;
  }

  render() {
    return (
      <Router>
        <div className="Modules">
          <div className="title">
            <h1>Modules</h1>
          </div>

          <section className="container">
            <div className="sidebar-list">
              <ul>
                <li><NavLink exact to={path.join(this.match.url, '/')} activeClassName="is-active">View all modules</NavLink></li>
                <li><NavLink to={path.join(this.match.url, '/new')} activeClassName="is-active">New module</NavLink></li>
              </ul>
            </div>

            <div className="content">
              <Route exact path={path.join(this.match.url, '/')} component={List}/>
              <Route path={path.join(this.match.url, '/new')} component={Edit}/>
              <Route path={path.join(this.match.url, '/edit/:id')} component={Edit}/>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default Modules;
