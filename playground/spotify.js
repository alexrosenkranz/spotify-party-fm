window.onSpotifyWebPlaybackSDKReady = () => {
  const token =
    'BQBUWwRtWLRaERRqdGXgA4J8fg-wx_2otfAGNAd2kGkRVB6ggzZP-VFwfAiZKmA1dkkm_595bf9sru-of037LMxbwPMreh54-YZa1PbVaQUdaZ6vv9KuGZ4z9W8gUOqblMUyE7L0FIvUtnZACDyzmyo8bgpvThtvPiZOv8zVPPs';
  let playerId;
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => {
      cb(token);
    }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('authentication_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('account_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('playback_error', ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener('player_state_changed', state => {
    console.log(state);
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    playerId=device_id
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();

fetch('https://api.spotify.com/v1/me/player', {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
    })
  }).then(res=> {
    console.log(res)
    return res.json()
  }).then(json => console.log(json))
  .catch(err => console.log(err))

  document.getElementById('play').addEventListener('click', function() {
    player.togglePlay().then(() => {
      console.log('Toggled playback!');
    });
  });
  document.getElementById('next').addEventListener('click', function() {
    player.nextTrack().then(() => {
      console.log('Toggled playback!');
    });
  });
  document.getElementById('prev').addEventListener('click', function() {
    player.prevTrack().then(() => {
      console.log('Toggled playback!');
    });
  });
};
