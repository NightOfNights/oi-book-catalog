import React from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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

  return (
    <div>
      Main Page
      <div>{'books'}</div>
      {loading ? (
        <Spin indicator={loadingIcon} />
      ) : error ? (
        <div>error</div>
      ) : (
        <div>asd</div>
      )}
    </div>
  );
};

export default MainPage;
