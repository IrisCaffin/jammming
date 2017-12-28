import React from 'react';
import './App.css';
// import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: 'name',
        artist: 'artist',
        album: 'album'
      }],
      playlistName: '',
      playlistTracks: [{
        name: 'name',
        artist: 'artist',
        album: 'album'
      }]
    }
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          { /* Add a SearchBar component */ }
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
