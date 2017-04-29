import React from 'react';
import Moment from 'react-moment';

var LaunchListEntry = (props) => (
  <div className="launch-list-entry">
    <div className="name"><h3>{props.currentLaunch.name}</h3></div>
    <div className="agency"><h4>{props.currentLaunch.agency}</h4></div>
    <div className="start-time">
      <h5>When:</h5>
      <Moment fromNow>{props.currentLaunch.starttime}</Moment>
    </div>
    <Moment>{props.currentLaunch.starttime}</Moment>
    <div className="location"><h5>Where:</h5> {props.currentLaunch.location}</div>
    <div className="description"><h5>Why:</h5> {props.currentLaunch.description}</div>
    <div className="video-url">
      <h5>Livestream:</h5>
      <iframe width="560" height="315" src={props.currentLaunch.embedurl} frameBorder="0" allowFullScreen></iframe>
    </div>
  </div>
)

export default LaunchListEntry;