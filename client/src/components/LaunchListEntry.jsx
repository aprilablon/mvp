import React from 'react';

var LaunchListEntry = (props) => (
  <div className="launch-list-entry">
    <div className="name"><h3>{props.launch.name}</h3></div>
    <div className="agency"><h4>{props.launch.agency}</h4></div>
    <div className="start-time"><h5>When:</h5> {props.launch.starttime}</div>
    <div className="location"><h5>Where:</h5> {props.launch.location}</div>
    <div className="description"><h5>Why:</h5> {props.launch.description}</div>
    <div className="video-url"><h5>Livestream:</h5> {props.launch.videourl}</div>
  </div>
)

export default LaunchListEntry;