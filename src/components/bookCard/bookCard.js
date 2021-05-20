import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Popconfirm } from 'antd';
import './bookCard.scss';

const popConfirmDeleteMessage = 'Are you sure to delete this book?';

const BookCard = ({
  id,
  name,
  author,
  ISBN,
  rating,
  publicationYear,
  onClickDelete,
  onClickEdit,
}) => {
  const handleClickDelete = () => {
    onClickDelete(id);
  };

  const handleClickEdit = () => {
    onClickEdit({ id, name, author, ISBN, rating, publicationYear });
  };

  return (
    <Card
      title={name}
      className="book-card"
      style={{ display: 'flex', flexDirection: 'column' }}
      headStyle={{ textAlign: 'center', fontWeight: 600 }}
      bodyStyle={{ flexGrow: 2 }}
    >
      <div className="book-card__wrapper">
        <div className="book-card__info">
          <span className="book-card__item">{`Author: ${author.join(
            '; '
          )}`}</span>
          {publicationYear ? (
            <span className="book-card__item">{`Publication year: ${publicationYear}`}</span>
          ) : null}
          {rating || rating === 0 ? (
            <span className="book-card__item">{`Rating: ${rating}`}</span>
          ) : null}
          {ISBN ? (
            <span className="book-card__item">{`ISBN: ${ISBN}`}</span>
          ) : null}
        </div>
        {onClickDelete || onClickEdit ? (
          <div className="book-card__buttons">
            {onClickEdit ? (
              <Button onClick={handleClickEdit} className="book-card__button">
                Edit
              </Button>
            ) : null}
            {onClickDelete ? (
              <Popconfirm
                title={popConfirmDeleteMessage}
                icon={null}
                onConfirm={handleClickDelete}
                okText="Yes"
                cancelText="No"
                className="book-card__pop-confirm"
              >
                <Button type="primary" danger className="book-card__button">
                  Delete
                </Button>
              </Popconfirm>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.arrayOf(PropTypes.string).isRequired,
  ISBN: PropTypes.string,
  rating: PropTypes.number,
  publicationYear: PropTypes.number,
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
};

export default BookCard;
