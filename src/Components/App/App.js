import React from 'react';
import './App.css';
// import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

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
    this.setState ({playlistTracks: this.state.playlistTracks.filer (
      track => track.ID !== deleteID)
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          { /* Add a SearchBar component */ }
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
