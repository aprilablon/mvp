import React from 'react';
import LaunchListEntry from './LaunchListEntry.jsx';

var LaunchList = (props) => (
  <div className="launch-list">
    <h2>Launch List</h2>
    <div>
      {props.launches.map((launch, index) => 
        <LaunchListEntry 
        launch={launch}
        key={index}
        />
      )}
    </div>
  </div>
)

export default LaunchList;