import React from 'react'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Library from './Library'
import SearchPage from './SearchPage'


class BooksApp extends React.Component {
  /**
   * This is the root component
   * It will have a state object keeping track of the books
   *
   * if a book is added or updated, it will update other components
   **/
  constructor() {
    super();
    this.updateLibrary = this.updateLibrary.bind(this);
    this.state = {
      books: [],
    };
  }

  /*
   * when componen is mounted, make a network request to update state
   *
   * This is done only once for efficiency
   */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      });
    });
  }

  /*
   * when state is updated as a result of
   * a book added or moved between shelves, update API
   */
  componentDidUpdate(prevProps, prevState) {
    const added_book = this.state.books.filter(x => prevState.books.indexOf(x) === -1);
    if (added_book.length === 1) {
      BooksAPI.update(added_book[0], added_book[0].shelf);
    }
  }

  /*
   * when a book is added or moved between shelves update state
   */
  updateLibrary(book, new_shelf_name) {
    const b = {};
    for(const key in book) {
      b[key] = book[key];
    }
    b['shelf'] = new_shelf_name;
    this.setState((oldState) => {
      return {
        books:  (oldState.books.filter((b) => b.id !== book.id).concat([b])),
      }
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => <Library updateLibrary={ this.updateLibrary } books={ this.state.books.sort(sortBy('title')) }/> }/>
        <Route exact path="/search" render={ () => <SearchPage updateLibrary={ this.updateLibrary } /> }/>
      </div>
    )
  }
}


export default BooksApp;
