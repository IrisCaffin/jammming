const clientID = '63fac515cc2d4a83b4ab95912fb7ad4b';
const redirectURI = 'http://jammmingIris.surge.sh/';
// const redirectURI = 'http://localhost:3000/';


let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenValue = window.location.href.match(/access_token=([^&]*)/);
    const expiresInValue = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenValue && expiresInValue) {
      accessToken = accessTokenValue;
      const expiresIn = expiresInValue;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonReponse => {
      if (!jsonReponse.tracks) {
        return [];
      }
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
    const accessToken = Spotify.accessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userID;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => response.json()
  ).then(jsonReponse => {
        userID = jsonReponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({playlistName: playlistName})
        }).then(response => response.json()
      ).then(jsonReponse => {
        const playlistID = jsonReponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        });
      });
    });
  }

};

export default Spotify;
