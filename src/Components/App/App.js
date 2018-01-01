import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name: 'name', artist: 'artist', album: 'album'}],
      playlistName: '',
      playlistTracks: [{name: 'name', artist: 'artist', album: 'album'}]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(trackToAdd) {
    let newID = trackToAdd.ID;
    let current = this.state.playlistTracks.filter (track => track.ID === newID);
    if (current.length === 0) {
      let playlist = this.state.playlistTracks;
      playlist.push (trackToAdd);
      this.setState ({playlistTracks: playlist});
    }
  }

  removeTrack(trackToDelete) {
    let deleteID = trackToDelete.ID;
    this.setState ({playlistTracks: this.state.playlistTracks.filter (
      track => track.ID !== deleteID)
    });
  }

  updatePlayListName(newPlaylistName) {
    this.setState ({playlistName: newPlaylistName});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState ({
        playlistName: 'New Playlist',
        searchResults: []
      });
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlayListName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
