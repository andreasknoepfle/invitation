import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
const FoodRadio = ({ checked, label, ...props }) => (
  <label class='food-radio'>
    {
      checked ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faCircle} />
    }
    <input
      type="radio"
      name="food"
      value={label}
      checked={checked}
      style={{ display: 'none'}}
      {...props}
    />
    {label}
  </label>
);

export default FoodRadio;
