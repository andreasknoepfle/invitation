import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker } from '@fortawesome/free-solid-svg-icons';

const Invitation = ({ checked, label, ...props }) => (
  <div className="row Invitation">
    <div className="column">
      <div className="row Invitation-item">
        <div className="column column-33">
          <FontAwesomeIcon icon={faCalendar} size="4x"/>
        </div>
        <div className="column column-67">
          <h2> Wann? </h2>
          31. August 2019<br/>
    <small>Im Sommer :)</small>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="row Invitation-item">
        <div className="column column-33">
          <FontAwesomeIcon icon={faMapMarker} size="4x"/>
        </div>
        <div className="column column-67">
          <h2> Wo? </h2>
          Waldparadies Borkheide<br/>
          <small>40 Minuten von Berlin</small>
        </div>
      </div>
    </div>
  </div>
);

export default Invitation;
