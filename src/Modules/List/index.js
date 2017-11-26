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
      })
      .catch(err => {
        console.error(err);
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
    if (isDeleteable) {
      let modules = this.state.modules;
      modules.splice(mapIndex, 1);
      this.setState(modules)
      this.deleteModule(id);
    }
  }

  render() {
    return (
      <div>
        <h2>View all modules</h2>
        <ul className="List">
          {this.state.modules.map((module, index) => {
<<<<<<< HEAD
            return <li key={index}>
              <Link to={path.join(this.match.url, `/edit/${module.id}`)}>
                {module.name}
=======
            return <li className="List__Item Module" key={index}>
              <div>
                <div className="Module__Name">{module.name}</div>
                <div className="Module__Description">{module.description}</div>
              </div>
              <Link className="Button" to={`${this.match.url}/edit/${module.id}`}>
                Edit
>>>>>>> origin/master
              </Link>
              <button type="button" className="Button" onClick={(e) => this.handleDelete(index, module.id)}>
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
