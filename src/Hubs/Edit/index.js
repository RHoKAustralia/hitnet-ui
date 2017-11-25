import React, { Component } from 'react';
import Axios from 'axios';

class Edit extends Component {
  constructor(props) {
    super();
    this.match = props.match;
    this.state = {
      hub: {
        country: '',
        region: '',
        description: '',
        location_type: ''
      },
      isNewHub: !this.match.params.id // so slick
    };

    console.log('is this a new hub ', !this.match.params.id);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if(!this.state.isNewHub) {
      this.getHub(this.match.params.id);
    }
  }

  // Load hub data
  getHub(id) {
    Axios.get(`/mock-data/hub-${id}.json`)
      .then(res => {
        console.log(res.data);
        this.setState({hub: res.data});
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Send submitted hub data to API
  postHub(data) {

  }

  // Run when any form input is changed
  handleChange(event) {
    let newHub = {
      ...this.state.hub,
      [event.target.name]: event.target.value
    };
    this.setState({
      hub: newHub
    });
  }

  // Run when form is submitted
  handleSubmit(event) {
    event.preventDefault();
    console.log('form submitted', this.state.huub);
    // this.postHub(this.state.hub);
  }

  render() {
    return (
      <div className="Edit">
        <h2>{this.state.isNewHub ? `Add` : `Edit`} hub</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>Country:</span>
            <input type="text" value={this.state.hub.country} name="country" onChange={this.handleChange} />
          </label><br />
          <label>
            <span>Region:</span>
            <input type="text" value={this.state.hub.region} name="path" onChange={this.handleChange} />
          </label><br />
          <label>
            <span>Description:</span>
            <input type="text" value={this.state.hub.description} name="description" onChange={this.handleChange} />
          </label><br />
          {/* TODO: Make this a checkbox */}
          <label>
            <span>Location type:</span>
            <input type="text" value={this.state.hub.location_type} name="description" onChange={this.handleChange} />
          </label><br />
          <button type="submit">{this.state.isNewHub ? `Add` : `Update`} hub</button>
        </form>
      </div>
    );
  }
}

export default Edit;
