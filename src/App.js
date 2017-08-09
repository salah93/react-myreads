import React from 'react'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Library from './Library'
import SearchPage from './SearchPage'


class BooksApp extends React.Component {
  constructor() {
    super()
    this.updateLibrary = this.updateLibrary.bind(this)
    this.state = {
      books: [],
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    let added_book = this.state.books.filter(x => prevState.books.indexOf(x) === -1)
    if (added_book.length === 1) {
      BooksAPI.update(added_book[0], added_book[0].shelf)
    }
  }

  updateLibrary(book, new_shelf_name) {
    let b = {};
    for(let key in book) {
      b[key] = book[key]
    }
    b['shelf'] = new_shelf_name
    this.setState((oldState) => {
      return {
        books:  (oldState.books.filter((b) => b.id !== book.id).concat([b])),
      }
    })
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


export default BooksApp
