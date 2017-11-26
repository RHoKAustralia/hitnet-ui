import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import api from '../../utils/api';

class List extends Component {
  constructor(props) {
    super();
    this.match = props.match;
    this.state = {
      modules: [],
      loading: true
    }

    this.getModules();
  }

  getModules() {
    api.getModulesList()
      .then(res => {
        if(res.status === 200) {
          this.setState({
            modules: res.data,
            loading: false
          });
        } else {
          alert('Sorry, something went wrong trying to fetch the data! Please refresh and try again.');
        }
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
      <div className={this.state.loading ? 'loading' : 'loading loaded'}>
        <img src="/loading.svg" className="loading__spinner" alt="Loading data" height="150" width="150" />
        <h2>View all modules</h2>
        <ul className="List">
          {this.state.modules.map((module, index) => {
            return <li className="List__Item Module" key={index}>
              <div>
                <div className="Module__Name">{module.name}</div>
                <div className="Module__Description">{module.description}</div>
              </div>
              <Link className="Button" to={`${this.match.url}/edit/${module.id}`}>
                Edit
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
