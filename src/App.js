import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar'
import BooksGrid from './BooksGrid'

class BooksApp extends React.Component {
  constructor() {
    super()
    this.updateValue = this.updateValue.bind(this)
    this.updateBook = this.updateBook.bind(this)
    this.state = {
      value: '',
      searchBooks: [],
      currentlyReading: [],
      read: [],
      wantToRead: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const currentlyReading = books.filter((b) => b.shelf === 'currentlyReading')
      const read = books.filter((b) => b.shelf === 'read')
      const wantToRead = books.filter((b) => b.shelf === 'wantToRead')
      this.setState({
        currentlyReading,
        read,
        wantToRead
      })
    })
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf)
    var {currentlyReading, read, wantToRead} = this.state
    var shelves = [currentlyReading, read, wantToRead]
    var currentShelf = this.state[shelf]
    book.shelf = shelf
    shelves.map((shelf) => {
      if (shelf !== currentShelf) {
        return shelf.filter((b) => b.id !== book.id)
      }
      else {
        return shelf.concat([book])
      }
    })
    this.setState({
      currentlyReading: shelves[0],
      read: shelves[1],
      wantToRead: shelves[2]
    })
  }



  updateValue(val) {
    const value = val.trim()
    this.setState({
      value: value
    })
    console.log(value)
    if (value !== '') {
      BooksAPI.search(value).then((searchBooks) => {
        if (Object.prototype.toString.call(searchBooks) !== '[object Array]')
          searchBooks = []
        this.setState({
          searchBooks
        })
      })
    }
    else {
      this.setState({
        searchBooks: []
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={ () => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to={{
                  pathname: '/',
                  state: { value: '', searchBooks: [] }
                }}
                className="close-search"
              >Close</Link>
              <div className="search-books-input-wrapper">
            <SearchBar value={ this.state.value } updateValue={ this.updateValue }/>
              </div>
            </div>
            <div className="search-books-results">
              <BooksGrid updateBook={this.updateBook} books={this.state.searchBooks}/>
            </div>
          </div>
        )} />
        <Route path="/" exact render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BooksGrid updateBook={this.updateBook} books={this.state.currentlyReading} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid updateBook={this.updateBook} books={this.state.wantToRead} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid updateBook={this.updateBook} books={this.state.read} />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to={{
                  pathname: '/search',
                  state: { value: '', searchBooks: [] }
                }}
                className="open-search"
              >Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
