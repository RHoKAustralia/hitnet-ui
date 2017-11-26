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
      hubs: [],
      loading: true
    }

    this.getHubs();
  }

  getHubs() {
    return api.getHubsList()
      .then(res => {
        if(res.status === 200) {
          this.setState({
            hubs: res.data,
            loading: false
          });
        } else {
          alert('Sorry, something went wrong trying to fetch the data! Please refresh and try again.');
        }
      });
  }

  // Delete hub from API
  deleteHub(id) {
    console.log('Deleting hub', id);
  }

  // Delete
  handleDelete(mapIndex, id) {
    let isDeleteable = window.confirm('Are you sure you want to delete this hub?');
    if(isDeleteable) {
      let hubs = this.state.hubs;
      hubs.splice(mapIndex, 1);
      this.setState(hubs)
      this.deleteHub(id);
    }
  }

  render() {
    return (
      <div className={this.state.loading ? 'loading' : 'loading loaded'}>
        <img src="/loading.svg" className="loading__spinner" alt="Loading data" height="150" width="150" />
        <h2>View all hubs</h2>
        <ul className="List">
          {this.state.hubs.map((hub, index) => {
            return <li key={index} className="List__Item Hub">
              <div>
                <div className="Hub__Name">{hub.region}, {hub.country}</div>
                <div className="Hub__Description">{hub.description} - {hub.loc_type}</div>
              </div>
              <Link to={`${this.match.url}/edit/${hub.id}`} className="Button">
                Edit
              </Link>
              <button type="button" className="Button" onClick={(e) => this.handleDelete(index, hub.id)}>
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
