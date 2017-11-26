import React, { Component } from 'react';
// import './Modules.css';
import Axios from 'axios';

class Edit extends Component {
  constructor(props) {
    super();
    this.match = props.match;
    this.state = {
      module: {
        name: '',
        path: '',
        description: '',
        actors: ''
      },
      isNewModule: !this.match.params.id // so slick
    };

    console.log('is this a new module ', !this.match.params.id);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if(!this.state.isNewModule) {
      this.getModule(this.match.params.id);
    }
  }

  // Load module data
  getModule(id) {
    Axios.get(`/mock-data/module-${id}.json`)
      .then(res => {
        console.log(res.data);
        this.setState({module: res.data});
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Send submitted module data to API
  postModule(data) {

  }

  // Run when any form input is changed
  handleChange(event) {
    let newModule = {
      ...this.state.module,
      [event.target.name]: event.target.value
    };
    this.setState({
      module: newModule
    });
  }

  // Run when form is submitted
  handleSubmit(event) {
    event.preventDefault();
    console.log('form submitted', this.state.module);
    // this.postModule(this.state.module);
  }

  render() {
    return (
      <div className="Modules">
        <h2>{this.state.isNewModule ? `Add` : `Edit`} module</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>Name:</span>
            <input type="text" value={this.state.module.name} name="name" onChange={this.handleChange} />
          </label><br />
          <label>
            <span>Path:</span>
            <input type="text" value={this.state.module.path} name="path" onChange={this.handleChange} />
          </label><br />
          <label>
            <span>Description:</span>
            <input type="text" value={this.state.module.description} name="description" onChange={this.handleChange} />
          </label><br />
          <label>
            <span>Actors:</span>
            <textarea name="actors" onChange={this.handleChange}>{this.state.module.actors}</textarea>
          </label><br />
          Demographic:
          <ul className="Input-List">
            <li><label><input type="checkbox" name="demographic" /> Elder Male</label></li>
            <li><label><input type="checkbox" name="demographic" /> Elder Female</label></li>
            <li><label><input type="checkbox" name="demographic" /> Adult Male</label></li>
            <li><label><input type="checkbox" name="demographic" /> Adult Female</label></li>
            <li><label><input type="checkbox" name="demographic" /> Teen Male</label></li>
            <li><label><input type="checkbox" name="demographic" /> Teen Female</label></li>
            <li><label><input type="checkbox" name="demographic" /> Child Male</label></li>
            <li><label><input type="checkbox" name="demographic" /> Child Female</label></li>
          </ul>
          <button type="submit" className="Button">{this.state.isNewModule ? `Add` : `Update`} module</button>
        </form>
      </div>
    );
  }
}

export default Edit;
