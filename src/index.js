import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { FirebaseProvider } from './providers/firebaseProvider';
import 'antd/dist/antd.css';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
