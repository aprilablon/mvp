import React from 'react';
import Moment from 'react-moment';

var LaunchListEntry = (props) => (
  <div className="launch-list-entry">
    <div className="name"><h2>{props.currentLaunch.name}</h2></div>
    <div className="agency"><h2>{props.currentLaunch.agency}</h2></div>
    <div className="start-time">
      <h4>When</h4>
      <Moment fromNow id="relative-time">{props.currentLaunch.starttime}</Moment>
    </div>
    <Moment>{props.currentLaunch.starttime}</Moment>
    <div className="location"><h4>Where</h4> {props.currentLaunch.location}</div>
    <iframe width="560" height="315" frameBorder="0" src={props.currentLaunch.map} allowFullScreen></iframe>
    <h4>Why</h4>
    <div className="description">{props.currentLaunch.description}</div>
    <div className="video-url">
      <h4>Livestream</h4>
      <iframe width="560" height="315" src={props.currentLaunch.embedurl} frameBorder="0" allowFullScreen></iframe>
    </div>
  </div>
)

export default LaunchListEntry;