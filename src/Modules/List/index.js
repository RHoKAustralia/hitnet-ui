import React, { Component } from 'react';
// import './Modules.css';
// import New from './New';
import {
  Link
} from 'react-router-dom';
import Axios from 'axios';

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
    Axios.get('/mock-data/modules.json')
      .then(res => {
        this.setState({modules: res.data.modules});
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Delete module from API
  deleteModule(id) {
    console.log('Deleting module', id);
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
              <Link to={`${this.match.url}edit/${module.id}`}>
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