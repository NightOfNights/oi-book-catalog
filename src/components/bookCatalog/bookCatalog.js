import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio, Button, Collapse, Row, Col } from 'antd';
import BookCard from '../bookCard/bookCard';
import {
  groupBooksByKeyWithSort,
  getSortedBookCatalogKeys,
  selectRecommendedBookFromCatalog,
  author,
  noKey,
  rating,
  noKeyHeader,
  publicationYear,
  recommendedBookTitle,
} from '../../utils/bookCatalogLogic';
import './bookCatalog.scss';

const { Panel } = Collapse;

const BookCatalog = ({ books, onBookDelete, onBookEdit, onBookAdd }) => {
  const [sortBy, setSortBy] = useState(publicationYear);

  const handleSortByChange = (event) => {
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

  const recommendedBookPanel = recommendedBook ? (
    <Panel header={'Recommended Book'} key={0} className="book-catalog__panel">
      <BookCard
        id={recommendedBook.id}
        name={recommendedBook.name}
        author={recommendedBook.author}
        publicationYear={recommendedBook?.publicationYear}
        rating={recommendedBook?.rating}
        ISBN={recommendedBook?.ISBN}
        className="book-catalog__book-card"
      />
    </Panel>
  ) : null;

  const bookList = sortedBookKeys.reduce((currentResult, currentValue) => {
    const panel = (
      <Panel
        header={currentValue === noKey ? noKeyHeader : currentValue}
        key={currentValue}
        className="book-catalog__panel"
      >
        <Row gutter={[16, 16]} className="book-catalog__panel-row">
          {booksSortedByKey[currentValue].map((book) => {
            return (
              <Col span={12} key={book.id} className="book-catalog__panel-col">
                <BookCard
                  id={book.id}
                  name={book.name}
                  author={book.author}
                  publicationYear={book?.publicationYear}
                  rating={book?.rating}
                  ISBN={book?.ISBN}
                  onClickDelete={handleClickDelete}
                  onClickEdit={handleClickEdit}
                  className="book-catalog__book-card"
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

  return (
    <div className="book-catalog">
      <div className="book-catalog__wrapper">
        <div className="book-catalog__control-panel">
          <div className="book-catalog__radio radio">
            <span className="radio__title">Sort by: </span>
            <Radio.Group
              onChange={handleSortByChange}
              value={sortBy}
              className="radio__group"
            >
              <Radio value={publicationYear} className="radio__option">
                Publication year
              </Radio>
              <Radio value={rating} className="radio__option">
                Rating
              </Radio>
              <Radio value={author} className="radio__option">
                Author
              </Radio>
            </Radio.Group>
          </div>
          <Button
            type="primary"
            onClick={handleClickAdd}
            className="book-catalog__button"
          >
            Add new book
          </Button>
        </div>
        <Collapse defaultActiveKey={[0]} className="book-catalog__collapse">
          {recommendedBookPanel}
          {bookList}
        </Collapse>
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
