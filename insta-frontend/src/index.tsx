import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { SavedPostsProvider } from './contexts/SavedPostsContext';

ReactDOM.render(
  <UserProvider>
    <SavedPostsProvider>
      <App />
    </SavedPostsProvider>
  </UserProvider>,
  document.getElementById('root'),
);
