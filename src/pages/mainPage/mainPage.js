import React, { useState } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Spin, Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BookCatalog, BookModal } from '../../components';
import './mainPage.scss';

const colSize = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 16 },
  lg: { span: 16 },
};

const MainPage = () => {
  const [isAddBookModalVisible, setIsAddBookModalVisible] = useState(false);
  const [isEditBookModalVisible, setIsEditBookModalVisible] = useState(false);
  const [currentEditingBook, setCurrentEditingBook] = useState({});

  const { firestore } = useFirebase();

  const [books, loading, error] = useCollectionData(
    firestore.collection('books'),
    { idField: 'id' }
  );

  const handleBookDelete = (id) => {
    firestore.collection('books').doc(id).delete();
  };

  const handleAddBookModalClickOk = (data) => {
    setIsAddBookModalVisible(false);
    firestore.collection('books').add(data);
  };

  const handleAddBookModalClickCancel = () => {
    setIsAddBookModalVisible(false);
  };

  const handleAddBookButtonClick = () => {
    setIsAddBookModalVisible(true);
  };

  const handleEditBookButtonClick = (bookCard) => {
    setIsEditBookModalVisible(true);
    setCurrentEditingBook(bookCard);
  };

  const handleEditBookModalClickOk = (data) => {
    const editedData = {
      ...data,
      publicationYear: data.publicationYear ? data.publicationYear : null,
      rating: data.rating || data.rating === 0 ? data.rating : null,
      ISBN: data.ISBN ? data.ISBN : null,
    };

    setIsEditBookModalVisible(false);
    firestore.collection('books').doc(currentEditingBook.id).update(editedData);
  };

  const handleEditBookModalClickCancel = () => {
    setIsEditBookModalVisible(false);
  };

  const loadingIcon = (
    <LoadingOutlined className="main-page__loading-icon" spin />
  );

  return (
    <Col span={24} className="main-page">
      <Row justify="center" className="main-page__header header">
        <Col {...colSize} className="header__wrapper">
          <div className="header__title">Book Catalog</div>
        </Col>
      </Row>
      <Row justify="center" className="main-page__wrapper-row">
        <Col {...colSize} className="main-page__wrapper-col">
          {loading ? (
            <Spin
              indicator={loadingIcon}
              size="large"
              className="main-page__spinner"
            />
          ) : error ? (
            <div className="main-page__error">
              <span className="main-page__error-message">Error!</span>
            </div>
          ) : (
            <BookCatalog
              books={books}
              onBookEdit={handleEditBookButtonClick}
              onBookDelete={handleBookDelete}
              onBookAdd={handleAddBookButtonClick}
              className="main-page__book-catalog"
            />
          )}
        </Col>
      </Row>
      <BookModal
        isModalVisible={isAddBookModalVisible}
        onClickOk={handleAddBookModalClickOk}
        onClickCancel={handleAddBookModalClickCancel}
        className="main-page__book-modal"
      />
      <BookModal
        isModalVisible={isEditBookModalVisible}
        editModal
        onClickOk={handleEditBookModalClickOk}
        onClickCancel={handleEditBookModalClickCancel}
        name={currentEditingBook.name}
        author={currentEditingBook.author}
        publicationYear={currentEditingBook?.publicationYear}
        rating={currentEditingBook?.rating}
        ISBN={currentEditingBook?.ISBN}
        className="main-page__book-modal"
      />
    </Col>
  );
};

export default MainPage;
