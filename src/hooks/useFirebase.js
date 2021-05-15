import { useContext } from 'react';
import { FirebaseContext } from '../providers/firebaseProvider';

export const useFirebase = () => {
  const { firebase, firestore } = useContext(FirebaseContext);
  return { firebase, firestore };
};
