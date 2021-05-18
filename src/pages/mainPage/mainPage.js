import React from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BookCatalog } from '../../components';
import './mainPage.scss';

const MainPage = () => {
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

  const handleBookDelete = async (id) => {
    const res = await firestore.collection('books').doc(id).delete();
    console.log(res);
  };

  const handleBookAdd = () => {
    console.log('add');
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
          onBookAdd={handleBookAdd}
        />
      )}
    </div>
  );
};

export default MainPage;
