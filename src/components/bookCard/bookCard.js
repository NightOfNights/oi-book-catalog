import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import './bookCard.scss';

const BookCard = ({
  id,
  name,
  author,
  isbn,
  rating,
  publicationYear,
  onClickDelete,
  onClickEdit,
}) => {
  const handleClickDelete = () => {
    onClickDelete(id);
  };

  const handleClickEdit = () => {
    onClickEdit(id, name, author, isbn, rating, publicationYear);
  };

  return (
    <Card
      title={name}
      className="book-card"
      style={{ display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ flexGrow: 2 }}
    >
      <div className="book-card__wrapper">
        <div className="book-card__info">
          <p className="book-card__item">{`Author: ${author.join(' ; ')}`}</p>
          {publicationYear ? (
            <p className="book-card__item">{`Publication year: ${publicationYear}`}</p>
          ) : null}
          {rating ? (
            <p className="book-card__item">{`Rating: ${rating}`}</p>
          ) : null}
          {isbn ? <p className="book-card__item">{`ISBN: ${isbn}`}</p> : null}
        </div>
        <div className="book-card__buttons">
          <Button onClick={handleClickEdit} className="book-card__button">
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleClickDelete}
            className="book-card__button"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.arrayOf(PropTypes.string).isRequired,
  isbn: PropTypes.string,
  rating: PropTypes.number,
  publicationYear: PropTypes.number,
  onClickDelete: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

export default BookCard;
