import React, { Component } from 'react';
import api from '../../utils/api';
import Button from '../../Button';

class Edit extends Component {
  constructor(props) {
    super();
    this.match = props.match;
    this.state = {
      hub: {
        country: '',
        region: '',
        description: '',
        location_type: '',
        modules_list: []
      },
      isNewHub: !this.match.params.id,
    };

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
    return api.getHubById(id)
      .then(res => {
        if(res.status === 200) {
          this.setState({hub: res.data});
        } else {
          alert('Sorry, something went wrong trying to fetch the data! Please refresh and try again.');
        }
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
    console.log('form submitted', this.state.hub);
    // this.postHub(this.state.hub);
  }

  render() {
    return (
      <div className="Hubs">
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
          <label>
            <span>Location type:</span>
            <input type="text" value={this.state.hub.location_type} name="description" onChange={this.handleChange} />
          </label><br />

          <button type="submit" className="Button">{this.state.isNewHub ? `Add` : `Update`} hub</button>

        </form>
      </div>
    );
  }
}

export default Edit;
