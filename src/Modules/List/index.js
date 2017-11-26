import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import path from 'path';
import Axios from 'axios';
import api from '../../utils/api';

class List extends Component {
  constructor(props) {
    super();
    this.match = props.match;
    this.state = {
      modules: []
    }

    this.getModules();
  }

  getModules() {
    api.getModulesList()
      .then(res => {
        console.log(res);
        // this.setState({modules: res.data.modules});
      });
  }

  // Delete module from API
  deleteModule(id) {
    console.log('Deleting module', id);
    api.deleteModule(id)
      .then(res => {
        alert('Deleted module', id);
      });
  }

  // Delete 
  handleDelete(mapIndex, id) {
    let isDeleteable = window.confirm('Are you sure you want to delete this module? This will not delete it from Google Cloud Platform.');
    if(isDeleteable) {
      let modules = this.state.modules;
      modules.splice(mapIndex, 1);
      this.setState(modules)
      this.deleteModule(id);
    }
  }

  render() {
    return (
      <div className="List">
        <h2>View all modules</h2>
        <ul>
          {this.state.modules.map((module, index) => {
            return <li key={index}>
              <Link to={path.join(this.match.url, `/edit/${module.id}`)}>
                {module.name}
              </Link>
              <button type="button" onClick={(e) => this.handleDelete(index, module.id)}>
                Delete
              </button>
            </li>
          })}
        </ul>
      </div>
    );
  }
}

export default List;