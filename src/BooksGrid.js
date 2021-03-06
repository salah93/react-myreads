import React from 'react';
import BookItem from './Book';


class BooksGrid extends React.Component {
  /**
   * This component shows a list of BookItem components
   **/
  render() {
    const books = this.props.books || [];
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.shelf }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.map((b) => (
              <BookItem key={ b.Title }
                updateBook={(book, shelf) => this.props.updateBook(book, shelf)}
                book={ b } />
            )) }
          </ol>
        </div>
      </div>
    );
  }
}


export default BooksGrid;
