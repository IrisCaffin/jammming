const clientID = '63fac515cc2d4a83b4ab95912fb7ad4b';
// const redirectURI = 'http://jammmingIris.surge.sh/';
const redirectURI = 'http://localhost:3000/';

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenValue = window.location.href.match(/access_token=([^&]*)/);
    const expiresInValue = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenValue && expiresInValue) {
      accessToken = accessTokenValue[1];
      const expiresIn = expiresInValue[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonReponse => {
      return jsonReponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }
    const accessTokenUser = Spotify.accessToken();
    const headers = {
      Authorization: `Bearer ${accessTokenUser}`,
      'content-type': 'application/json'
    };
    let userID;
    return fetch('https://api.spotify.com/v1/me', {headers: headers}
  ).then(response => {
    return response.json()
  }, networkError => console.log('Can not access user id')
    ).then(jsonReponse => {
        userID = jsonReponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})
        }).then(response => {
          return response.json()
        }, networkError => console.log('Can not create playlist')
      ).then(jsonReponse => {
          const playlistID = jsonReponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})
          }).then(response => {
            return response.json()
          }, networkError => console.log('Can not create tracks')
        );
      });
    });
  }

};

export default Spotify;
