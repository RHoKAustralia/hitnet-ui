import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Axios from 'axios';

class List extends Component {
  constructor(props) {
    super();
    this.match = props.match;
    this.state = {
      hubs: []
    }

    this.getHubs();
  }

  getHubs() {
    Axios.get('/mock-data/hubs.json')
      .then(res => {
        this.setState({hubs: res.data.hubs});
      })
      .catch(err => {
        console.error(err);
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
      <div className="List">
        <h2>View all hubs</h2>
        <ul>
          {this.state.hubs.map((hub, index) => {
            return <li key={index}>
              <Link to={`${this.match.url}/edit/${hub.id}`}>
                {hub.region}, {hub.country} <em>{hub.description}</em> - {hub.location_type}
              </Link>
              <button type="button" onClick={(e) => this.handleDelete(index, hub.id)}>
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
