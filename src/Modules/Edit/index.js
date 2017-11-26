import React, { Component } from 'react';
import api from '../../utils/api';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class Edit extends Component {
  constructor(props) {
    super();
    this.match = props.match;
    this.state = {
      module: {
        name: '',
        path: '',
        description: '',
        actors: '',
        hubs: []
      },
      isNewModule: !this.match.params.id, // so slick
      hubOptions: [
        { value: 'NN0052', label: 'Woorabinda Health Clinic' },
        { value: 'NN0053', label: 'Brisbane Youth Detention Centre' },
        { value: 'NN0054', label: 'Cohealth Footscray' }
      ],
      hubOptionsRemoved: [],
      isHubSelectDisabled: true
    };

    this.hubGroups = [
      "Nationally",
      "State",
      "Regionally",
      "Location type",
      "Individual hub",
      "None"
    ]

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
    api.getModuleById(id)
      .then(res => {
        if(res.status === 200) {
          this.setState({module: res.data});
        } else {
          alert('Sorry, something went wrong trying to fetch the data! Please refresh and try again.');
        }
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
    // console.log('form submitted', this.state.module);
    api.createModule({"name": "My module", "path": "/path/module"})
      .then(res => {
        console.log(res);
      });
  }

  handleHubSelect(option) {
    let newModule = {
      ...this.state.module,
      hubs: [...this.state.module.hubs, option]
    };

    let index = this.state.hubOptions.findIndex(i => i.value === option.value);

    this.state.hubOptions.splice(index, 1);

    this.setState({
      module: newModule,
      hubOptions: [...this.state.hubOptions],
      hubOptionsRemoved: [...this.state.hubOptionsRemoved, option]
    });
  }

  handleRemoveHub(index, option) {
    this.state.hubOptionsRemoved.splice(index, 1);

    let hubIndex = this.state.module.hubs.findIndex(i => i.value === option.value);
    this.state.module.hubs.splice(hubIndex, 1);

    let newModule = {
      ...this.state.module,
      hubs: [...this.state.module.hubs]
    };

    this.setState({
      module: newModule,
      hubOptions: [...this.state.hubOptions, option],
      hubOptionsRemoved: [...this.state.hubOptionsRemoved]
    })
  }

  handleHubGroupChange(option) {
    if (option === "Individual hub") {
      this.setState({
        isHubSelectDisabled: false
      });
    } else {
      this.setState({
        isHubSelectDisabled: true
      });
    }
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
            <textarea name="actors" onChange={this.handleChange} value={this.state.module.actors}></textarea>
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

          <h3>Attach module to hubs</h3>
          <ul className="Input-List">
            {this.hubGroups.map((item, index) => {
              return <li key={index}>
                <label><input type="radio" name="moduleGroup" onChange={() => this.handleHubGroupChange(item)} /> {item}</label>
              </li>
            })}
          </ul>

          <div className={this.state.isHubSelectDisabled ? "hidden" : ""}>
            <label>Select individual hubs:</label>
            <Select
              className="Modules__Hub-Select"
              name="moduleSelect"
              onChange={(value) => this.handleHubSelect(value)}
              options={this.state.hubOptions}
            />

            <ul className="List Module__Hubs-List">
              {this.state.module.hubs.map((hub, index) => {
                return <li key={index} className="List__Item">
                  <div>{hub.label}</div>
                  <button type="button" className="Button" onClick={() => this.handleRemoveHub(index, hub)}>Remove hub</button>
                </li>
              })}
            </ul>
          </div>

          <button type="submit" className="Button">{this.state.isNewModule ? `Add` : `Update`} module</button>
        </form>
      </div>
    );
  }
}

export default Edit;
