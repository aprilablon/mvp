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
      landingPage: true,
      noFavorites: false,
      saved: 0
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/',
      success: function() {
        console.log('Successful POST request - refresh and clear favorites');
      },
      error: function() {
        console.log('Bad POST request - favorites not cleared');
      }
    })
  }

  postLaunchData(callback, query) {
    var context = this;

    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/launches',
      data: JSON.stringify({ query }),
      contentType: 'application/json',
      success: function() {
        console.log('Successful POST request - stored launch data');
        context.getLaunchData(callback, query);
      },
      error: function() {
        console.log('Bad POST request - unable to store launch data');
      }
    })
  }

  getLaunchData(callback, query) {
    var path = query.split('/')[0];

    $.ajax({
      type: 'GET',
      url: `http://127.0.0.1:3000/launches/${path}`,
      success: function(data) {
        console.log('Successful GET request - retrieved launch data');
        callback(data);
      },
      error: function() {
        console.log('Bad GET request - unable to retrieve launches');
      }
    })
  }

  setLaunchData(data) {
    if (data.length === 0) {
      this.setState({
        noFavorites: true
      })
    } else {
      this.setState({
        count: 0,
        launches: data,
        currentLaunch: data[0],
        landingPage: false,
        noFavorites: false
      })
    }
  }

  clickFalcon(event) {
    this.postLaunchData(this.setLaunchData.bind(this), 'falcon');
    this.setState({
      onFavourites: false
    })
  }

  clickNextNum(event) {
    var number = prompt("How many future launches do you wanna see?");
    this.postLaunchData(this.setLaunchData.bind(this), `next/${number}`);
    this.setState({
      onFavourites: false
    })
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

  postSavedLaunchData() {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/save',
      data: JSON.stringify({ launch: this.state.currentLaunch }),
      contentType: 'application/json',
      success: function(data) {
        console.log('Successful POST request - favorite saved');
      },
      error: function() {
        console.log('Bad POST request - favorite not saved');
      }
    })
  }

  getSavedLaunchData(callback) {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/favorites',
      success: function(data) {
        console.log('Successful GET request - retrieved favorites');
        callback(data);
      },
      error: function() {
        console.log('Bad GET request - unable to retrieve favorites');
      }
    })
  }

  numberOfFavorites(list) {
    this.setState({
      saved: list.length
    })
  }

  clickSave(event) {
    this.postSavedLaunchData();
    this.getSavedLaunchData(this.numberOfFavorites.bind(this));
    alert('Saved!');
  }

  clickSavedItems(event) {
    this.getSavedLaunchData(this.setLaunchData.bind(this));
  }

  render() {
    if (this.state.landingPage) {
      return (
        <div className="centered-text landing-page">
          <button className="falcon-button" onClick={this.clickFalcon.bind(this)}>Past Falcon Launches</button>
          <button className="future-button" onClick={this.clickNextNum.bind(this)}>Future Launches</button>
        </div>
      )
    } else if (this.state.noFavorites) {
      return (
        <div className="centered-text launch-item">
          <div>
            <img width="50" height="50" title="Past SpaceX Falcon Launches" src="https://image.flaticon.com/icons/png/512/86/86572.png" onClick={this.clickFalcon.bind(this)}></img>
            <img width="50" height="50" title="Future Rocket Launches" src="http://simpleicon.com/wp-content/uploads/rocket.png" onClick={this.clickNextNum.bind(this)}></img>
            <img width="50" height="50" title="My Saved Launches" src="https://image.freepik.com/free-icon/ice-cream_318-63065.jpg" onClick={this.clickSavedItems.bind(this)}></img>
          </div>
          <h1>You don't have any favorites</h1>
        </div>
      )
    } 
    return (
      <div className="centered-text launch-item">
        <div>
          <img width="50" height="50" title="Past SpaceX Falcon Launches" src="https://image.flaticon.com/icons/png/512/86/86572.png" onClick={this.clickFalcon.bind(this)}></img>
          <img width="50" height="50" title="Future Rocket Launches" src="http://simpleicon.com/wp-content/uploads/rocket.png" onClick={this.clickNextNum.bind(this)}></img>
          <img width="50" height="50" title="My Saved Launches" src="https://image.freepik.com/free-icon/ice-cream_318-63065.jpg" onClick={this.clickSavedItems.bind(this)}></img>
        </div>
        <div>
          <button type="button" onClick={this.clickPrevious.bind(this)}>Previous</button>
          <button type="button" onClick={this.clickNext.bind(this)}>Next</button>
          <button type="button" onClick={this.clickSave.bind(this)}>Save</button>
        </div>
        <p>Page: {this.state.count + 1}</p>
        <p>Number of Launches: {this.state.launches.length}</p>
        <p>Saved Launches: {this.state.saved}</p>
        <div>
          <LaunchListEntry currentLaunch={this.state.currentLaunch} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
        


        // <LaunchList launches={this.state.launches} />
          // <button type="button" onClick={this.clickFalcon.bind(this)}>FALCONS</button>
          // <button type="button" onClick={this.clickNextNum.bind(this)}>NEXT LAUNCHES</button>