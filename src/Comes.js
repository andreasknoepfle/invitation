import React from 'react';
import Radio from './Radio';
const Comes = ({ comes, onChange, name }) => (
  <form className="Comes">
    <h2>
      { name && `${name}, bist Du dabei?`}
      { !name && `Bist Du dabei?`}
    </h2>
    <Radio
      label="Ja"
      checked={comes === "Ja"}
      onChange={onChange}
    />
    <Radio
      label="Nein"
      checked={comes === "Nein"}
      onChange={onChange}
    />
  </form>
);

export default Comes;
