import React from 'react';
import logo from './hitnet-logo.png';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import './HeaderNav.css';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <Link to="/" className="header__logo-link">
        <img src={logo} alt=""/>
        <span>Hub Admin</span>
      </Link>

      <nav className="nav">
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              activeClassName="is-active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/modules"
              activeClassName="is-active">
              Modules
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hubs"
              activeClassName="is-active">
              Hubs
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

export default Header;
