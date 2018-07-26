import React, {Component} from 'react';
import API from './utils/API';

class App extends Component {
  state = {}

  componentDidMount() {
    const params = this.getHashParams();
    console.log(params);
    this.setState(params);
  }

  // get params out of url
  getHashParams = () => {
    const hashParams = {};
    console.log(window.location)
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window
        .location
        .hash
        .substring(1);

    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  // get refresh token
  getRefreshToken = () => {
    API
      .refreshToken(this.state.refresh_token)
      .then(res => {
        console.log(res.data);
        this.setState({access_token: res.data.access_token})
      })
      .catch(err => {
        console.log(err);
      })
  }

  // get user profile
  getSpotifyProfile = () => {
    API
      .getSpotifyProfile(this.state.access_token)
      .then(res => {
        console.log(res.data);
        this.setState({userInfo: res.data})
      })
      .catch(err => console.log(err));
  }

  // get user playlists
  getSpotifyPlaylists = () => {
    API
      .getSpotifyPlaylists(this.state.access_token)
      .then(res => {
        console.log(res.data);
        this.setState({playlistData: res.data})
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <a href="http://localhost:3001/api/auth/login">Log Into Spotify!</a><br/>

        <button onClick={this.getRefreshToken}>Refresh Token!</button><br/>
        <button onClick={this.getSpotifyProfile}>Get User Info</button><br/>
        <button onClick={this.getSpotifyPlaylists}>Get Playlist Info</button><br/> {this.state.userInfo
          ? JSON.stringify(this.state.userInfo, null, 2)
          : "Login!!!"}<br/> {this.state.playlistData
          ? JSON.stringify(this.state.playlistData, null, 2)
          : "Get Playlists!!!"}
      </div>
    );
  }
}

export default App;
