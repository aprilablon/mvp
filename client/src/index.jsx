import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import LaunchList from './components/LaunchList.jsx';
import LaunchListEntry from './components/LaunchListEntry.jsx';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      launches: [],
      currentLaunch: {},
      landingPage: true
    }
  }

  postLaunchData(callback, query) {
    var context = this;

    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/launches',
      data: JSON.stringify({ query }),
      contentType: 'application/json',
      success: function() {
        console.log('Successful POST request');
        context.getLaunchData(callback, query);
      },
      error: function() {
        console.log('Bad POST request');
      }
    })
  }

  getLaunchData(callback, query) {
    var path = query.split('/')[0];
    // console.log('GET path: ', path);
    $.ajax({
      type: 'GET',
      url: `http://127.0.0.1:3000/launches/${path}`,
      success: function(data) {
        console.log('Successful GET request');
        callback(data);
      },
      error: function() {
        console.log('Bad GET request');
      }
    })
  }

  setLaunchData(data) {
    this.setState({
      count: 0,
      launches: data,
      currentLaunch: data[0]
    })
    // console.log('SET state: ', this.state);
  }

  clickFalcon(event) {
    this.postLaunchData(this.setLaunchData.bind(this), 'falcon');
    this.setState({
      landingPage: false
    })
    // console.log('FALCON state: ', this.state);
  }

  clickNextNum(event) {
    var number = prompt("How many future launches do you wanna see?");
    this.postLaunchData(this.setLaunchData.bind(this), `next/${number}`);
    this.setState({
      landingPage: false
    })
    // console.log('NEXT NUM state: ', this.state);
  }

  clickNext(event) {
    if (this.state.count < this.state.launches.length - 1) {
      var updateCount = this.state.count + 1;
      this.setState({
        count: updateCount,
        currentLaunch: this.state.launches[updateCount]
      })
    }
  }

  clickPrevious(event) {
    if (this.state.count > 0) {
      var updateCount = this.state.count - 1;
      this.setState({
        count: updateCount,
        currentLaunch: this.state.launches[updateCount]
      })
    }
  }

  render() {
    if (this.state.landingPage) {
      return (
        <div className="centered-text">
          <p>Show me:</p>
          <div>
            <button type="button" onClick={this.clickFalcon.bind(this)}>FALCONS</button>
            <button type="button" onClick={this.clickNextNum.bind(this)}>NEXT LAUNCHES</button>
          </div>
        </div>
      )
    }
    return (
      <div className="centered-text">
        <p>Show me:</p>
        <div>
          <button type="button" onClick={this.clickFalcon.bind(this)}>FALCONS</button>
          <button type="button" onClick={this.clickNextNum.bind(this)}>NEXT LAUNCHES</button>
        </div>
        <p>Page: {this.state.count + 1}</p>
        <p>Number of Launches: {this.state.launches.length}</p>
        <div>
          <button type="button" onClick={this.clickPrevious.bind(this)}>Previous</button>
          <button type="button" onClick={this.clickNext.bind(this)}>Next</button>
        </div>
        <div>
          <LaunchListEntry currentLaunch={this.state.currentLaunch} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
        


        // <LaunchList launches={this.state.launches} />