import React, { Component } from 'react';
import API from './utils/API';

class App extends Component {
  state = {}

  componentDidMount () {
    const params = this.getHashParams();
    console.log(params);
    this.setState(params);
  }
  

  getHashParams = () => {
    const hashParams = {};
    console.log(window.location)
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);

    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getRefreshToken = () => {
    API.refreshToken(this.state.refresh_token)
      .then(res => {
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        Hey There!
        <a href="http://localhost:3001/api/auth/login">Log Into Spotify!</a>
        <button onClick={this.getRefreshToken}>Refresh Token!</button>
      </div>
  );
  }
}

export default App;
