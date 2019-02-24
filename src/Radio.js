import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
const Radio = ({ checked, label, ...props }) => (
  <label className='food-radio'>
    {
      checked ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faCircle} />
    }
    <input
      type="radio"
      value={label}
      checked={checked}
      style={{ display: 'none'}}
      {...props}
    />
    <span>{label}</span>
  </label>
);

export default Radio;
