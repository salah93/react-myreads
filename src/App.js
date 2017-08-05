import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar'
import BooksGrid from './BooksGrid'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReading: [],
    read: [],
    wantToRead: []
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

  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={ () => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link 
                to="/"
                className="close-search"
              >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <SearchBar />
              </div>
            </div>
            <div className="search-books-results">
              <BooksGrid />
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
                    <BooksGrid books={this.state.currentlyReading} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid books={this.state.wantToRead} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid books={this.state.read} />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
