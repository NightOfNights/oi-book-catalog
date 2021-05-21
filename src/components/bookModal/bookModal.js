import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import NumberSlider from '../numberSlider/numberSlider';
import './bookModal.scss';

const formLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const emptyFieldErrorMessage = 'This field can not be empty!';
const nameMaxLength = 30;
const publicationYearMinValue = 1800;
const publicationYearMaxValue = new Date().getFullYear();
const isbnRegExp = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

const BookModal = ({
  isModalVisible,
  editModal,
  onClickOk,
  onClickCancel,
  name,
  author,
  rating,
  publicationYear,
  ISBN,
}) => {
  const [ratingInputValue, setRatingInputValue] = useState(0);

  useEffect(() => {
    if (rating) setRatingInputValue(rating);
    return () => {
      setRatingInputValue(0);
    };
  }, [rating]);

  const handleClickOk = (formData) => {
    const formDataToSubmit = Object.assign(
      {},
      { name: formData.name },
      { author: formData.author.split(';').map((item) => item.trim()) },
      formData.publicationYear && { publicationYear: formData.publicationYear },
      typeof ratingInputValue === 'number' && { rating: ratingInputValue },
      formData.ISBN && { ISBN: formData.ISBN }
    );

    onClickOk(formDataToSubmit);
  };

  const handleClickCancel = () => {
    onClickCancel();
  };

  const handleRatingChange = (value) => {
    setRatingInputValue(value);
  };

  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleClickCancel}
      destroyOnClose
      footer={null}
      className="book-modal"
    >
      <div className="book-modal__header">
        {editModal ? 'Edit book' : 'Add book'}
      </div>
      <Form
        {...formLayout}
        onFinish={handleClickOk}
        initialValues={{
          name,
          author: author ? author.join('; ') : '',
          publicationYear,
          ISBN,
        }}
        className="book-modal__form form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: emptyFieldErrorMessage,
            },
            {
              max: nameMaxLength,
              message: `The maximum length of this field is ${nameMaxLength} characters!`,
            },
          ]}
          className="form__item"
        >
          <Input placeholder="Book name" className="form__input" />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: emptyFieldErrorMessage,
            },
          ]}
          className="form__item"
        >
          <Input
            placeholder="Specify author or authors (through semicolon)"
            className="form__input"
          />
        </Form.Item>
        <Form.Item
          label="Publication Year"
          name="publicationYear"
          rules={[
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve();
                }
                if (value < publicationYearMinValue) {
                  return Promise.reject(
                    `Publication year can not be yearlier than ${publicationYearMinValue}!`
                  );
                }
                if (value > publicationYearMaxValue) {
                  return Promise.reject(
                    `Publication year can not be later than ${publicationYearMaxValue}!`
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
          validateTrigger="onBlur"
          className="form__item"
        >
          <InputNumber
            placeholder="Publication year"
            className="form__input form__input-number"
          />
        </Form.Item>
        <Form.Item label="Rating" name="rating" className="form__item">
          <NumberSlider
            min={0}
            max={10}
            initialValue={rating}
            onSliderValueChange={handleRatingChange}
            className="form__number-slider"
          />
        </Form.Item>
        <Form.Item
          label="ISBN"
          name="ISBN"
          rules={[
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve();
                }
                if (!value.match(isbnRegExp)) {
                  return Promise.reject('Invalid ISBN!');
                }
                return Promise.resolve();
              },
            }),
          ]}
          validateTrigger="onBlur"
          className="form__item"
        >
          <Input placeholder="ISBN" className="form__input" />
        </Form.Item>
        <div className="form__footer">
          <Button onClick={handleClickCancel} className="form__button">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="form__button">
            OK
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

BookModal.propTypes = {
  isModalVisible: PropTypes.bool,
  editModal: PropTypes.bool,
  onClickOk: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  name: PropTypes.string,
  author: PropTypes.arrayOf(PropTypes.string),
  rating: PropTypes.number,
  publicationYear: PropTypes.number,
  ISBN: PropTypes.string,
};

export default BookModal;
