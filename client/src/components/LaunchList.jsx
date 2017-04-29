import React from 'react';
import LaunchListEntry from './LaunchListEntry.jsx';

var LaunchList = (props) => (
  <div className="launch-list">
    <h2>Launch List</h2>
    <div className="launch-list-entry">
      <div className="name"><h3>{props.currentLaunch.name}</h3></div>
      <div className="agency"><h4>{props.currentLaunch.agency}</h4></div>
      <div className="start-time"><h5>When:</h5> {props.currentLaunch.starttime}</div>
      <div className="location"><h5>Where:</h5> {props.currentLaunch.location}</div>
      <div className="description"><h5>Why:</h5> {props.currentLaunch.description}</div>
      <div className="video-url"><h5>Livestream:</h5> {props.currentLaunch.videourl}</div>
    </div>
  </div>
)

export default LaunchList;
    // <div>
    //   {props.launches.map((launch, index) => 
    //     <LaunchListEntry 
    //     launch={launch}
    //     key={index}
    //     />
    //   )}
    // </div>