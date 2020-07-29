import React, { useState, useRef } from 'react';
import { retrieveToken, fetchWithAuth } from '../helpers/auth';

interface CreatePostProp { }
const CreatePost: React.FC<CreatePostProp> = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const CreatePost = async () => {
    const formdata = new FormData();
    if (!fileRef.current?.files) {
      return;
    }
    formdata.append('description', caption);
    formdata.append('photos', fileRef.current.files[0]);
    formdata.append('tags', JSON.stringify(tags));
    const createPostResp = fetchWithAuth(
      `http://localhost:3001/posts/upload`,
      retrieveToken(),
      {
        method: 'POST',
        // headers: { 'Content-Type': 'multipart/form-data' },
        body: formdata,
      },
    );
    return createPostResp;
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        CreatePost();
      }}
    >
      <input
        type="text"
        placeholder="Write a caption..."
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        onChange={(e) => setTags([...tags, e.target.value])}
        placeholder="tag people"
      />
      <input type="file" ref={fileRef} />

      <button>Tag People</button>
      <button>Add Location</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePost;
