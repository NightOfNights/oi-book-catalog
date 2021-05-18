import React, { useState } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BookCatalog, BookModal } from '../../components';
import './mainPage.scss';

const MainPage = () => {
  const [isAddBookModalVisible, setIsAddBookModalVisible] = useState(false);

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

  const handleBookEdit = () => {
    console.log('edit');
  };

  const handleAddBookModalClickOk = async (data) => {
    setIsAddBookModalVisible(false);
    const res = await firestore.collection('books').add(data);
    console.log(res);
  };

  const handleAddBookModalClickCancel = () => {
    setIsAddBookModalVisible(false);
  };

  const handleBookDelete = async (id) => {
    const res = await firestore.collection('books').doc(id).delete();
    console.log(res);
  };

  const handleBookAddButtonClick = () => {
    setIsAddBookModalVisible(true);
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
          onBookEdit={handleBookEdit}
          onBookDelete={handleBookDelete}
          onBookAdd={handleBookAddButtonClick}
        />
      )}
      <BookModal
        isModalVisible={isAddBookModalVisible}
        onClickOk={handleAddBookModalClickOk}
        onClickCancel={handleAddBookModalClickCancel}
      />
    </div>
  );
};

export default MainPage;
