import React from 'react';

import when from './when.png';
import where from './where.png';

const Invitation = ({ checked, label, ...props }) => (
  <div className="row Invitation">
    <div className="column Invitation-item">
      <img src={when} alt="when" className="icon"/>
      <h2> Wann? </h2>
      <b>Samstag, 31. August 2019</b><br/>
      <small>um 14:00 Uhr</small>
    </div>
    <div className="column Invitation-item">
      <a href='#location'><img src={where} alt="where" className="icon"/></a>
      <h2> Wo? </h2>
      <b>Waldparadies Borkheide</b><br/>
      <small>40 Minuten von Berlin</small>
    </div>
  </div>
);

export default Invitation;
