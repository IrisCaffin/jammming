import React from 'react';
import './App.css';
// import '../SearchBar/SearchBar';
// import '../SearchResults/SearchResults';
// import '../Playlist/Playlist';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
          { /* Add a SearchBar component */ }
          <div class="App-playlist">
            { /* Add a SearchResults component */ }
            { /* Add a Playlist component */ }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
