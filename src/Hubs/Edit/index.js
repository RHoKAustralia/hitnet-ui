import React, { Component } from 'react';
import api from '../../utils/api';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
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
      moduleOptions: [
        { value: '1234', label: 'The Diabetes Story' },
        { value: '4321', label: 'Care fo Kids Ear Health' }
      ],
      moduleOptionsRemoved: [],
      isModuleSelectDisabled: true
    };

    this.moduleGroups = [
      "Nationally",
      "State",
      "Region",
      "Location type",
      "Individually"
    ]

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
    return api.getOneHub(id)
      .then(res => {
        this.setState({hub: res.data});
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

  handleModuleSelect(option) {
    let newHub = {
      ...this.state.hub,
      modules_list: [...this.state.hub.modules_list, option]
    };

    let index = this.state.moduleOptions.findIndex(i => i.value === option.value);

    this.state.moduleOptions.splice(index, 1);

    this.setState({
      hub: newHub,
      moduleOptions: [...this.state.moduleOptions],
      moduleOptionsRemoved: [...this.state.moduleOptionsRemoved, option]
    });
  }

  handleRemoveModule(index, option) {
    this.state.moduleOptionsRemoved.splice(index, 1);

    let moduleListIndex = this.state.hub.modules_list.findIndex(i => i.value === option.value);
    this.state.hub.modules_list.splice(moduleListIndex, 1);

    this.setState({
      ...this.state.hub,
      modules_list: [...this.state.hub.modules_list],
      moduleOptions: [...this.state.moduleOptions, option],
      moduleOptionsRemoved: [...this.state.moduleOptionsRemoved]
    })
  }

  handleModuleGroupChange(option) {
    if (option === "Individually") {
      this.setState({
        isModuleSelectDisabled: false
      });
    } else {
      this.setState({
        isModuleSelectDisabled: true
      });
    }
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

          <h3>Attach modules</h3>

          <p>Attach all modules:</p>
          <ul className="Input-List">
            {this.moduleGroups.map((item) => {
              return <li>
                <label><input type="radio" name="moduleGroup" onChange={() => this.handleModuleGroupChange(item)} /> {item}</label>
              </li>
            })}
          </ul>

          <div className={this.state.isModuleSelectDisabled && !this.state.hub.modules_list.length ? "hidden": ""}>
            <label>Select individual modules:</label>
            <Select
              className="Hub__Module-Select"
              name="moduleSelect"
              onChange={(value) => this.handleModuleSelect(value)}
              options={this.state.moduleOptions}
              disabled={this.state.isModuleSelectDisabled}
            />
          </div>


          <ul className={"List Hub__Modules-List " + (this.state.isModuleSelectDisabled ? "List Hub__Modules-List--Disabled" : '')}>
            {this.state.hub.modules_list.map((module, index) => {
              return <li key={index} className="List__Item">
                <div>{module.label}</div>
                <button type="button" className="Button" onClick={() => this.handleRemoveModule(index, module)} disabled={this.state.isModuleSelectDisabled}>Remove module</button>
              </li>
            })}
          </ul>

          <button type="submit" className="Button">{this.state.isNewHub ? `Add` : `Update`} hub</button>

        </form>
      </div>
    );
  }
}

export default Edit;
