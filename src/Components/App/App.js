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
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(trackToAdd) {
    let newID = trackToAdd.id;
    let current = this.state.playlistTracks.filter (track => track.id === newID);
    if (current.length === 0) {
      let playlist = this.state.playlistTracks;
      // console.log('Track: ' + trackToAdd.id);
      playlist.push (trackToAdd);
      // console.log(playlist);
      this.setState ({playlistTracks: playlist});
    }
  }

  removeTrack(trackToDelete) {
    let deleteID = trackToDelete.id;
    this.setState ({playlistTracks: this.state.playlistTracks.filter (
      track => track.id !== deleteID)
    });
  }

  updatePlayListName(newPlaylistName) {
    this.setState ({playlistName: newPlaylistName});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(() => {
      this.setState ({
        playlistName: 'New Playlist',
        // searchResults: [],
        playlistTracks: []
      });
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
      // console.log(searchResults);
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
