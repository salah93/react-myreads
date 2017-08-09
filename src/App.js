import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import Library from './Library'
import sortBy from 'sort-by'


class BooksApp extends React.Component {
  constructor() {
    super()
    this.updateLibrary = this.updateLibrary.bind(this)
    this.state = {
      books: [],
      update: false
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextBooks = nextState.books
    const nextBooksLength = nextBooks.length
    const thisBooks = this.state.books
    const thisBooksLength = thisBooks.length
    /*
     * after mount books is set to new length
     * will update api when no need to
     */
    if (nextBooksLength !== thisBooksLength)
      return true
    for (let i = 0; i < nextBooksLength; i++){
      if (nextBooks[i].id !== thisBooks[i].id || nextBooks[i].shelf !== thisBooks[i].shelf)
        return true
    }
    return false
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update !== false) {
      let added_book = this.state.books.filter(x => prevState.books.indexOf(x) === -1)[0];
      BooksAPI.update(added_book, added_book.shelf)
    }
  }

  updateLibrary(book, new_shelf_name) {
    let b = {};
    for(let key in book){
      if (key === 'shelf')
        b[key] = new_shelf_name
      else
        b[key] = book[key]
    }
    this.setState((oldState) => {
      return {
        books:  (oldState.books.filter((b) => b.id !== book.id).concat([b])),
        update: true
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={ () => (
          <SearchPage updateLibrary={ this.updateLibrary } />
        )} />
        <Route path="/" exact render={ () => (
          <Library updateLibrary={ this.updateLibrary } books={ this.state.books.sort(sortBy('title')) }/>
        )} />
      </div>
    )
  }
}

export default BooksApp
