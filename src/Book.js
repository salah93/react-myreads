import React from 'react';


class BookItem extends React.Component {
  /**
   * A component rendering a book
   **/
  render() {
    const {book, updateBook} = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
                style={{width: 128,
                        height: 193,
                        /*
                         * backgroundImage:
                         * `url(${book.imageLinks.thumbnail})`}}>
                         */
                        backgroundImage: `url(${book.cover})`}}>
            </div>
            <div className="book-shelf-changer">
              <select
                onClick={ (event) => updateBook(book, event.target.value) }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.Title}</div>
          <div className="book-authors">
            <p>Authors:</p>
            <span>{book.authors}</span>
          </div>
        </div>
      </li>
    );
  }
}


export default BookItem;
