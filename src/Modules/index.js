import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './Modules.css';
import New from './New';

const List = () => (
  <div>
    <h2>View Modules</h2>
  </div>
)

const Edit = ({ match }) => (
  <div>
    <h3>Edit: {match.params.id}</h3>
  </div>
)

class Modules extends Component {
  constructor(props) {
    super();
    this.match = props.match;
    console.log(this.match);
  }
  render() {
    return (
      <Router>
        <div className="Modules">

          <ul>
            <li><Link to={`${this.match.url}/`}>View all modules</Link></li>
            <li><Link to={`${this.match.url}/new`}>New module</Link></li>
            <li><Link to={`${this.match.url}/edit`}>Edit module</Link></li>
          </ul>

          <hr/>

          <Route exact path={`${this.match.url}/`} component={List}/>
          <Route path={`${this.match.url}/new`} component={New}/>
          <Route path={`${this.match.url}/edit/:id`} component={Edit}/>
        </div>
      </Router>
    );
  }
}

export default Modules;




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

