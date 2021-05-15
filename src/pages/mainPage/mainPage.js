import React from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const MainPage = () => {
  const { firestore } = useFirebase();

  const [books, loading, error] = useCollectionData(
    firestore.collection('books')
  );

  console.log(...(books || ''));

  return (
    <div>
      Main Page
      <div>{'books'}</div>
    </div>
  );
};

export default MainPage;
