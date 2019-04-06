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
    { comes && comes === "Ja" && <span className="Bubble Bubble-left">Juhu! :)</span>}
    { comes && comes === "Nein" && <span className="Bubble Bubble-left">Schade :(</span>}
  </form>
);

export default Comes;
