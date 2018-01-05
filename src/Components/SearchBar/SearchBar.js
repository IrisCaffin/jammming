import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
    console.log(this.state.term);
  }

  clearSearch() {
    this.setState ({term: ''});
    this.props.onClear();
  }

  handleTermChange(event) {
    this.setState ({term: event.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input  placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange} />
              <a onClick={this.search}>SEARCH</a><br />
              <a onClick={this.clearSearch}>CLEAR SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
