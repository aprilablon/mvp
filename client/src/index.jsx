import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import LaunchList from './components/LaunchList.jsx';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      launches: [],
      currentLaunch: {}
    }
  }

  postLaunchData(callback) {
    var context = this;

    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/launches',
      success: function() {
        console.log('Successful POST request');
        context.getLaunchData(callback);
      },
      error: function() {
        console.log('Bad POST request');
      }
    })
  }

  getLaunchData(callback) {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/launches',
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
      launches: data,
      currentLaunch: data[this.state.count]
    })
    // console.log(this.state);
  }

  componentDidMount() {
    this.postLaunchData(this.setLaunchData.bind(this));
  }

  clickNext(event) {
    // console.log('NEXT length: ', this.state.launches.length);
    if (this.state.count < this.state.launches.length - 1) {
      // console.log('NEXT before: ', this.state);
      var updateCount = this.state.count + 1;
      // console.log('NEXT updateCount: ', updateCount);
      this.setState({
        count: updateCount,
        currentLaunch: this.state.launches[updateCount]
      })
      // console.log('NEXT after: ', this.state);
    }
  }

  clickPrevious(event) {
    // console.log('PREVIOUS length: ', this.state.launches.length);
    if (this.state.count > 0) {
      // console.log('PREVIOUS before: ', this.state);
      var updateCount = this.state.count - 1;
      // console.log('PREVIOUS updateCount: ', updateCount);
      this.setState({
        count: updateCount,
        currentLaunch: this.state.launches[updateCount]
      })

      // console.log('PREVIOUS after: ', this.state);
    }
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.clickPrevious.bind(this )}>Previous</button>
        <button type="button" onClick={this.clickNext.bind(this)}>Next</button>
        <LaunchList currentLaunch={this.state.currentLaunch} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
        


        // <LaunchList launches={this.state.launches} />