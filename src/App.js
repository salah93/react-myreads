import React from 'react';
import {Route} from 'react-router-dom';
import sortBy from 'sort-by';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Library from './Library';
import SearchPage from './SearchPage';


class BooksApp extends React.Component {
  /**
   * This is the root component
   * It will have a state object keeping track of the books
   *
   * if a book is added or updated, it will update other components
   **/
  state = {
    books: [],
  };

  /*
   * when componen is mounted, make a network request to update state
   *
   * This is done only once for efficiency
   */
  componentDidMount() {
    BooksAPI.getAll().then((all) => {
      console.log('here');
      const books = all.filter(b => b.shelf !== 'none');
      const shelves = all.map(b => b.shelf);
      console.log(all);
      console.log('here');
      console.log(shelves);
      console.log('here');
      console.log(books);
      this.setState({
        books,
      });
    });
  }

  /*
   * when state is updated as a result of
   * a book added or moved between shelves, update API
   */
  componentDidUpdate(prevProps, prevState) {
    const addedBook = this.state.books.filter(
      book => prevState.books.indexOf(book) === -1);
    if (addedBook.length === 1) {
      BooksAPI.update(addedBook[0], addedBook[0].shelf);
    }
  }

  /*
   * when a book is added or moved between shelves update state
   */
  updateLibrary(book, newShelfName) {
    const b = {};
    for (const key in book) {
      b[key] = book[key];
    }
    b['shelf'] = newShelfName;
    this.setState((oldState) => {
      return {
        books: (oldState.books.filter(
          (b) => b['ASIN/ISBN'] !== book['ASIN/ISBN']).concat([b])),
      };
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () =>
          <Library
            updateLibrary={ (book, shelf) => this.updateLibrary(book, shelf) }
            books={ this.state.books.sort(sortBy('Title')) }/>
         }/>
        <Route exact path="/search" render={ () =>
          <SearchPage
            updateLibrary={ (book, shelf) => this.updateLibrary(book, shelf) }
          /> }/>
      </div>
    );
  }
}


export default BooksApp;
