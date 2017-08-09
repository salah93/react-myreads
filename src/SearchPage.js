import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import SearchBar from './SearchBar'


class SearchPage extends React.Component {
  /**
   * This component shows the Search page
   *
   *  It houses a state object that keeps track of query in input,
   *   as well as the resulting search results from network call
   **/
  constructor() {
    super();
    this.updateValue = this.updateValue.bind(this);
    this.state = {
      value: '',
      searchBooks: [],
    };
  }

  /*
   * when value is updated search for related books in network request
   */
  componentDidUpdate(prevProps, prevState) {
    const value = this.state.value.trim();
    let searchBooks = [];
    if (value !== prevState.value) {
      if (value !== '') {
        BooksAPI.search(value).then((result) => {
          // make sure result is array, if not there were no results found
          if (Object.prototype.toString.call(result) === '[object Array]')
            searchBooks = result;
          this.setState({
            searchBooks
          });
        })
      }
      else {
        // this means user deleted query, reflect that change
        this.setState({
          searchBooks
        });
      }
    }
  }

  updateValue(val) {
    const value = val.trim();
    this.setState({
      value
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
        <SearchBar value={ this.state.value } updateValue={ this.updateValue }/>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid updateBook={this.props.updateLibrary} books={this.state.searchBooks}/>
        </div>
      </div>
    )  
  }
}


export default SearchPage;
