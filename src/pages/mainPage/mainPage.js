import React, { useState } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BookCatalog, BookModal } from '../../components';
import './mainPage.scss';

const MainPage = () => {
  const [isAddBookModalVisible, setIsAddBookModalVisible] = useState(false);
  const [isEditBookModalVisible, setIsEditBookModalVisible] = useState(false);
  const [currentEditingBook, setCurrentEditingBook] = useState({});

  const { firestore } = useFirebase();

  const [books, loading, error] = useCollectionData(
    firestore.collection('books'),
    { idField: 'id' }
  );

  const loadingIcon = (
    <LoadingOutlined className="main-page__loading-icon" spin />
  );
  if (books) {
    console.log(books);
  }

  const handleBookDelete = async (id) => {
    const res = await firestore.collection('books').doc(id).delete();
    console.log(res);
  };

  const handleAddBookModalClickOk = async (data) => {
    setIsAddBookModalVisible(false);
    const res = await firestore.collection('books').add(data);
    console.log(res);
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

  const handleEditBookModalClickOk = async (data) => {
    const editedData = {
      ...data,
      publicationYear: data.publicationYear ? data.publicationYear : null,
      rating: data.rating || data.rating === 0 ? data.rating : null,
      ISBN: data.ISBN ? data.ISBN : null,
    };
    console.log(editedData);
    setIsEditBookModalVisible(false);
    const res = await firestore
      .collection('books')
      .doc(currentEditingBook.id)
      .update(editedData);

    console.log(res);
  };

  const handleEditBookModalClickCancel = () => {
    setIsEditBookModalVisible(false);
  };

  return (
    <div>
      Main Page
      <div>{'books'}</div>
      {loading ? (
        <Spin indicator={loadingIcon} />
      ) : error ? (
        <div>error</div>
      ) : (
        <BookCatalog
          books={books}
          onBookEdit={handleEditBookButtonClick}
          onBookDelete={handleBookDelete}
          onBookAdd={handleAddBookButtonClick}
        />
      )}
      <BookModal
        isModalVisible={isAddBookModalVisible}
        onClickOk={handleAddBookModalClickOk}
        onClickCancel={handleAddBookModalClickCancel}
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
      />
    </div>
  );
};

export default MainPage;
