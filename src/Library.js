import React from 'react';
import {Link} from 'react-router-dom';
import BooksGrid from './BooksGrid';


class Library extends React.Component {
  /**
   * This component will have a state object keeping track of different shelves
   *
   *
   **/
  constructor(props) {
    super(props);
    const {books} = this.props;
    const {currentlyReading, read, wantToRead} = this.updateBooks(books);
    this.state = {
      currentlyReading,
      read,
      wantToRead,
    };
  }

  /*
   * State depends on props
   */
  updateBooks(books) {
    const currentlyReading = books.filter(
      (b) => b.shelf === 'currentlyReading');
    const read = books.filter(
      (b) => b.shelf === 'read');
    const wantToRead = books.filter(
      (b) => b.shelf === 'wantToRead');
    return {currentlyReading, read, wantToRead};
  }

  /*
   * Render shelves
    componentDidMount() {
      const books = this.props.books;
      this.updateBooks(books);
    }
   */

  /*
   * update shelves when a book is moved or added to library
   */
  componentWillReceiveProps(nextProps, nextState) {
    const books = nextProps.books;
    const {currentlyReading, read, wantToRead} = this.updateBooks(books);
    this.setState({
      currentlyReading,
      read,
      wantToRead,
    });
  }

  render() {
    const {currentlyReading, read, wantToRead} = this.state;
    const {updateLibrary} = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BooksGrid shelf="Currently Reading"
              updateBook={ (book, shelf) => updateLibrary(book, shelf) }
              books={ currentlyReading } />
            <BooksGrid shelf="Want to Read"
              updateBook={ (book, shelf) => updateLibrary(book, shelf) }
              books={ wantToRead } />
            <BooksGrid shelf="Read"
              updateBook={ (book, shelf) => updateLibrary(book, shelf) }
              books={ read } />
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            className="open-search"
          >Add a book</Link>
        </div>
      </div>
    );
  }
}


export default Library;
