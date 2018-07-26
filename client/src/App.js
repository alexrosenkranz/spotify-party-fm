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
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window
        .location
        .hash
        .substring(1);

    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    // remove hash stuff
    window
      .history
      .pushState("", document.title, window.location.pathname + window.location.search);

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
        <div className="jumbotron jumbotron-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 text-align-center">
              {this.state.userInfo
                ? (
                  <h2>Welcome {this.state.userInfo.display_name}!</h2>
                )
                : ""}
              {!this.state.access_token
                ? (
                  <a
                    className="btn btn-lg btn-success"
                    href="http://localhost:3001/api/auth/login">Log Into Spotify!</a>
                )
                : (
                  <div>
                    <button className="btn btn-lg btn-danger" onClick={this.getRefreshToken}>
                      Get Refresh Token
                    </button>
                    <button className="btn btn-lg btn-success" onClick={this.getSpotifyProfile}>
                      Get User Info
                    </button>
                    <button className="btn btn-lg btn-info" onClick={this.getSpotifyPlaylists}>
                      Get Playlists
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="container">
        <div className="row">
          {this.state.playlistData
            ? (this.state.playlistData.items.map(playlist => {
              return (
                <div className="col-3" key={playlist.id}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={playlist.images[0].url}
                      alt="playlist image"/>
                    <div className="card-body">
                      <h5 className="card-title">{playlist.name}</h5>
                      <p className="card-text">{playlist.tracks.total
                          ? playlist.tracks.total
                          : 0}
                        Tracks</p>
                      <button className="btn btn-primary">Load Playlist</button>
                    </div>
                  </div>
                </div>
              )
            }))
            : ""}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
