import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid';


class SearchPage extends React.Component {
  /**
   * This component shows the Search page
   *
   *  It houses a state object that keeps track of query in input,
   *   as well as the resulting search results from network call
   **/
  state = {
    value: '',
    searchBooks: [],
  };

  /*
   * when value is updated search for related books in network request
   */
  componentDidUpdate(prevProps, prevState) {
    const value = this.state.value.trim().toLowerCase();
    let searchBooks = [];
    if (value !== prevState.value) {
      if (value !== '') {
        BooksAPI.search(value, 10).then((searchBooks) => {
          this.setState({
            searchBooks,
          });
        });
      } else {
        // this means user deleted query, reflect that change
        this.setState({
          searchBooks,
        });
      }
    }
  }

  updateValue(val) {
    const value = val.trim();
    this.setState({
      value,
    });
  }

  render() {
    const {value, searchBooks} = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
        <input type="text"
          value={value}
          onChange={(e) =>
            this.updateValue(e.target.value)}
          placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            updateBook={(book, shelf) => this.props.updateLibrary(book, shelf)}
            books={searchBooks}/>
        </div>
      </div>
    );
  }
}


export default SearchPage;
