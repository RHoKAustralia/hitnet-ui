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
      <div>
        <h2>View all hubs</h2>
        <ul className="List">
          {this.state.hubs.map((hub, index) => {
            return <li key={index} className="List__Item Hub">
              <div>
                <div className="Hub__Name">{hub.region}, {hub.country}</div>
                <div className="Hub__Description">{hub.description} - {hub.location_type}</div>
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
