import React, { SetStateAction, useContext } from 'react';
import { PostInterface } from '../interfaces/post';
import { useState, useEffect } from 'react';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';

interface SavedPostsContextState {
  savedPosts: PostInterface[] | undefined;
  setSavedPosts: React.Dispatch<SetStateAction<PostInterface[] | undefined>>;
}

const SavedPostsContext = React.createContext<SavedPostsContextState>({
  savedPosts: undefined,
  setSavedPosts: () => { },
});

export const SavedPostsProvider: React.FC = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState<PostInterface[] | undefined>();

  useEffect(() => {
    fetchWithAuth(`http://localhost:3001/auth/savedPosts`, retrieveToken(), {
      method: 'GET',
    }).then(async (savedPostsResp) => {
      setSavedPosts(await savedPostsResp.json());
    });
  }, []);

  return (
    <SavedPostsContext.Provider value={{ savedPosts, setSavedPosts }}>
      {children}
    </SavedPostsContext.Provider>
  );
};

export const useSavedPosts = () => {
  const { savedPosts, setSavedPosts } = useContext(SavedPostsContext);

  return { savedPosts, setSavedPosts };
};
