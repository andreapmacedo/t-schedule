import React, { useState } from 'react';

export default function TagCreator(props) {
  
  const getLocalStorage = () => {
    const localStorage = window.localStorage;
    const tags = localStorage.getItem('tags');
    if (tags) {
      return JSON.parse(tags);
    } else {
      return [];
    }
  }
  
  const [tags, setTags] = useState(getLocalStorage());

  const setLocalStorage = (tags) => {
    const localStorage = window.localStorage; 
    localStorage.setItem('tags', JSON.stringify(tags)); 
  }
  
  const addTag = (tag) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    setLocalStorage(newTags);
  }

  const removeTag = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setLocalStorage(newTags);
  }

  const clearTags = () => {
    setTags([]);
    setLocalStorage([]);
  }


  return (
    <>
      <h1>TagCreator</h1>
      <button onClick={() => addTag('tag1')}>Add tag1</button>
      <button onClick={() => removeTag('tag1')}>Remove tag2</button>
    </>
  );
}