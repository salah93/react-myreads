import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'


class Library extends React.Component {
  /**
   * This component will have a state object keeping track of different shelves
   *
   *
   **/
  constructor() {
    super();
    this.updateBooks = this.updateBooks.bind(this);
    this.state = {
      currentlyReading: [],
      read: [],
      wantToRead: []
    };
  }

  /*
   * State depends on props
   */
  updateBooks(books) {
    const currentlyReading = books.filter((b) => b.shelf === 'currentlyReading');
    const read = books.filter((b) => b.shelf === 'read');
    const wantToRead = books.filter((b) => b.shelf === 'wantToRead');
    this.setState({
      currentlyReading,
      read,
      wantToRead
    });
  }

  /*
   * Render shelves
   */
  componentDidMount() {
    const books = this.props.books;
    this.updateBooks(books);
  }

  /*
   * update shelves when a book is moved or added to library
   */
  componentWillReceiveProps(nextProps, nextState) {
    const books = nextProps.books;
    this.updateBooks(books);
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BooksGrid shelf="Currently Reading" updateBook={ this.props.updateLibrary } books={ this.state.currentlyReading } />
            <BooksGrid shelf="Want to Read" updateBook={ this.props.updateLibrary } books={ this.state.wantToRead } />
            <BooksGrid shelf="Read" updateBook={ this.props.updateLibrary } books={ this.state.read } />
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            className="open-search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}


export default Library;
