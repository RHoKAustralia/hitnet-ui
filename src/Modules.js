import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './Modules.css';

const List = () => (
  <div>
    <h2>View Modules</h2>
  </div>
)

const New = () => (
  <div>
    <h2>New Module</h2>
  </div>
)

const Edit = ({ match }) => (
  <div>
    <h3>{match.params.moduleId}</h3>
  </div>
)

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic}/>
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )

class Modules extends Component {
  render() {
    return (
      <Router>
        <div className="Modules">

          <ul>
            <li><Link to="/">View all modules</Link></li>
            <li><Link to="/new">New module</Link></li>
            <li><Link to="/edit">Edit module</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={List}/>
          <Route path="/new" component={New}/>
          <Route path="/edit" component={Edit}/>
        </div>
      </Router>
    );
  }
}

export default Modules;
