import React from 'react';

import when from './when.png';
import where from './where.png';

const Invitation = ({ checked, label, ...props }) => (
  <div className="row Invitation">
    <div className="column Invitation-item">
      <img src={when} alt="when" className="icon"/>
      <h2> Wann? </h2>
      31. August 2019<br/>
      <small>Im Sommer :)</small>
    </div>
    <div className="column Invitation-item">
      <img src={where} alt="where" className="icon"/>
      <h2> Wo? </h2>
      Waldparadies Borkheide<br/>
      <small>40 Minuten von Berlin</small>
    </div>
  </div>
);

export default Invitation;
