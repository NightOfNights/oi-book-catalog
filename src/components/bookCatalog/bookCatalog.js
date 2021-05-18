import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio, Button, Collapse, Row, Col } from 'antd';
import BookCard from '../bookCard/bookCard';
import './bookCatalog.scss';

const { Panel } = Collapse;

const author = 'author';
const publicationYear = 'publicationYear';
const rating = 'rating';
const noKey = 'noKey';
const noKeyHeader = 'Not specified';

const groupBooksByKeyWithSort = (arr, key) => {
  const newArr = [...arr];

  return newArr
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    })
    .reduce((currentArr, item) => {
      if (key === author) {
        for (const author of item[key]) {
          if (author.length)
            currentArr[author] = [...(currentArr[author] || []), item];
        }
      } else if (item[key] || item[key] === 0) {
        const currentKey = item[key];
        currentArr[currentKey] = [...(currentArr[currentKey] || []), item];
      } else {
        currentArr[noKey] = [...(currentArr[noKey] || []), item];
      }

      return currentArr;
    }, {});
};

const getSortedBookCatalogKeys = (books, isNumberKeys = false) => {
  const bookCatalogKeys = Object.keys(books);
  console.log(bookCatalogKeys);
  let hasNoKeys = false;

  if (noKey in bookCatalogKeys) {
    hasNoKeys = true;
    bookCatalogKeys.splice(bookCatalogKeys.indexOf([noKey]), 1);
  }

  if (isNumberKeys) {
    bookCatalogKeys.sort((a, b) => Number(b) - Number(a));
  } else {
    bookCatalogKeys.sort((a, b) => {
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  return hasNoKeys ? bookCatalogKeys.push(noKey) : bookCatalogKeys;
};

const selectRecommendedBookFromCatalog = (books) => {
  const bookYearRestriction = new Date().getFullYear() - 3;

  const filteredBooks = books.filter(
    (item) => item.publicationYear > bookYearRestriction
  );

  const highestBookRating = filteredBooks.reduce((a, b) =>
    a.rating > b.rating ? a : b
  ).rating;

  const recommendedBooks = filteredBooks.filter(
    (item) => item.rating == highestBookRating
  );

  return recommendedBooks[Math.floor(Math.random() * recommendedBooks.length)];
};

const BookCatalog = ({ books, onBookDelete, onBookEdit, onBookAdd }) => {
  const [sortBy, setSortBy] = useState(publicationYear);

  const handleSortByChange = (event) => {
    console.log('Sort by', event.target.value);
    setSortBy(event.target.value);
  };

  const handleClickAdd = () => {
    onBookAdd();
  };

  const handleClickDelete = (id) => {
    onBookDelete(id);
  };

  const handleClickEdit = (bookCard) => {
    onBookEdit(bookCard);
  };

  const booksSortedByKey = groupBooksByKeyWithSort(books, sortBy);
  const sortedBookKeys =
    sortBy === author
      ? getSortedBookCatalogKeys(booksSortedByKey)
      : getSortedBookCatalogKeys(booksSortedByKey, true);
  const recommendedBook = selectRecommendedBookFromCatalog(books);

  const recommendedBookCard = recommendedBook ? (
    <BookCard
      id={recommendedBook.id}
      name={recommendedBook.name}
      author={recommendedBook.author}
      publicationYear={recommendedBook?.publicationYear}
      rating={recommendedBook?.rating}
      ISBN={recommendedBook?.ISBN}
    />
  ) : null;

  const bookList = sortedBookKeys.reduce((currentResult, currentValue, idx) => {
    const panel = (
      <Panel
        header={currentValue === noKey ? noKeyHeader : currentValue}
        key={idx}
      >
        <Row gutter={16}>
          {booksSortedByKey[currentValue].map((book) => {
            return (
              <Col span={8} key={book.id} className="book-catalog__col">
                <BookCard
                  id={book.id}
                  name={book.name}
                  author={book.author}
                  publicationYear={book?.publicationYear}
                  rating={book?.rating}
                  ISBN={book?.ISBN}
                  onClickDelete={handleClickDelete}
                  onClickEdit={handleClickEdit}
                />
              </Col>
            );
          })}
        </Row>
      </Panel>
    );

    currentResult.push(panel);
    return currentResult;
  }, []);

  console.log(booksSortedByKey);

  return (
    <div className="book-catalog">
      <div className="book-catalog__wrapper">
        <div>
          <span>Sort by: </span>
          <Radio.Group onChange={handleSortByChange} value={sortBy}>
            <Radio value={publicationYear}>Publication year</Radio>
            <Radio value={rating}>Rating</Radio>
            <Radio value={author}>Author</Radio>
          </Radio.Group>
        </div>
        <div>
          <Button type="primary" onClick={handleClickAdd}>
            Add new book
          </Button>
        </div>
        <div>
          {recommendedBookCard}
          <Collapse defaultActiveKey={['0']}>{bookList}</Collapse>
        </div>
        <div>Book Catalog</div>
      </div>
    </div>
  );
};

BookCatalog.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookDelete: PropTypes.func.isRequired,
  onBookEdit: PropTypes.func.isRequired,
  onBookAdd: PropTypes.func.isRequired,
};

export default BookCatalog;
