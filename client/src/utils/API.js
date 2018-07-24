import axios from 'axios';

export default {
  /* 
    loginCreds = {username: "alex", "password": 12345Password!}
  */
  refreshToken: function (token) {
    return axios.get('/api/auth/refresh', {
      params: {
        refresh_token: token
      }
    })
  }
}