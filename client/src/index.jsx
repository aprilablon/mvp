import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import LaunchList from './components/LaunchList.jsx';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      launches: [{a: 1}, {b: 2}]
    }
  }

  loadLaunchData(callback) {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/launches',
      success: function(data) {
        console.log('Sucessful POST request');
        callback(data);
      },
      error: function() {
        console.log('Bad POST request');
      }
    })
  }

  setLaunchData(data) {
    this.setState({
      launches: data
    })
  }

  componentDidMount() {
    this.loadLaunchData(this.setLaunchData.bind(this));
  }

  render() {
    return (
      <div>
        <LaunchList launches={this.state.launches} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));