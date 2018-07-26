import axios from 'axios';

export default {
  /*
    loginCreds = {username: "alex", "password": 12345Password!}
  */
  refreshToken : function (refreshToken) {
    return axios.get('/api/auth/refresh', {
      params: {
        refresh_token: refreshToken
      }
    })
  },
  getSpotifyProfile : function (accessToken) {
    return axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getSpotifyPlaylists : function (accessToken) {
    return axios.get(`https://api.spotify.com/v1/me/playlists`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        limit: 50
      }
    })
  }
}