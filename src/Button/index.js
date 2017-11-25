import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Button.css';

const Button = (props, options) => (
  <button className="Button">{props.children}</button>
)

export default Button;