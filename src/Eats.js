import React from 'react';
import Radio from './Radio';
const Eats = ({ value, onChange, name }) => (
  <form className="Eats">
    <h2>
      { name && ` Wie möchtest Du essen, ${name}?`}
      { !name && `Wie möchtest Du essen?`}
    </h2>
    <Radio
      label="Vegetarisch"
      checked={value === "Vegetarisch"}
      onChange={onChange}
    />
    <Radio
      label="Vegan"
      checked={value === "Vegan"}
      onChange={onChange}
    />
    <Radio
      label="Alles"
      checked={value === "Alles"}
      onChange={onChange}
    />
  </form>
);

export default Eats;
