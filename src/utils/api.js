import Axios from 'axios';
import path from 'path';

const CORS_PROXY = 'https://crossorigin.me/'
const ENDPOINT = 'http://54.153.171.157';

const api = {
  // Modules

  // [
  //   {
  //     "id": "123",
  //     "name": "The Diabetes Story",
  //     "description": "Diabetes education"
  //   },
  //   {
  //     "id": "256",
  //     "name": "Care for Kids Ear Health",
  //     "description": "Kids ear health education"
  //   }
  // ]
  getModulesList: function() {
    // return Axios.get('/mock-data/modules.json')
    return Axios.get(CORS_PROXY + ENDPOINT + '/module')
      .catch(err => {
        console.error(err);
      });
  },

  // {
  //   "id": "123",
  //   "name": "The Diabetes Story",
  //   "path": "/path/to/module",
  //   "description": "Diabetes education",
  //   "actors": "Tamara Jones, Damon Burke",
  //   "cultural_group": "Indigenous Australian"
  //   "demographic_female_elder": true,
  //   "demographic_male_elder": true,
  //   "demographic_female_adult": true,
  //   "demographic_male_adult": true,
  //   "demographic_female_teen": false,
  //   "demographic_male_teen": false,
  //   "demographic_female_child": false,
  //   "demographic_male_child": false
  // }
  getModuleById: function(id) {
    return Axios.get(`/mock-data/module-${id}.json`)
      .catch(err => {
        console.error(err);
      });
  },

  createModule: function(module) {
    console.log(module);
    return Axios.post(CORS_PROXY + ENDPOINT + '/insert/', module, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  },

  updateModule: function(module) {
    return true;
  },

  // TODO: Make this delete not GET
  deleteModule: function(id) {
    return Axios.get('/mock-data/modules.json')
      .catch(err => {
        console.error(err);
      });
  },

  // Hubs

  // [
  //   {
  //     "id": "123",
  //     "name": "NN0052",
  //     "description": "Woorabinda Health Clinic"
  //   },
  //   {
  //     "id": "256",
  //     "name": "NN0053",
  //     "description": "Brisbane Youth Detention Centre"
  //   }
  // ]
  getHubsList: function() {
    return Axios.get('/mock-data/hubs.json')
      .catch(err => {
        console.error(err);
      });
  },

  // {
  //   "id": "123",
  //   "name": "NN0052",
  //   "description": "Woorabinda Health Clinic",
  //   "country": "Australia",
  //   "region": "Queensland",
  //   "loc_type": "Health Clinic"
  // }
  getHubById: function(id) {
    return Axios.get(`/mock-data/hub-${id}.json`)
      .catch(err => {
        console.error(err);
      });
  },

  createHub: function(hub) {
    return true;
  },

  updateHub: function(hub) {
    return true;
  },

  deleteHub: function(id) {
    return true;
  }
}

export default api;