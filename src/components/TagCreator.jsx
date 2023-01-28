import React, { useEffect, useState } from 'react';

export default function TagCreator() {
  const [tags, setTags] = useState();
  const [tag, setTag] = useState();

  const getLocalStorage = () => {
    console.log('getLocalStorage->tags');
    const localStorage = window.localStorage;
    const tags = localStorage.getItem('tags');
    if (tags) {
      return JSON.parse(tags);
    } else {
      return [];
    }
  }
  
  const setLocalStorage = (tags) => {
    const localStorage = window.localStorage; 
    localStorage.setItem('tags', JSON.stringify(tags)); 
  }
  
  const addTag = () => {
    if(!tag) return; // if tag is empty, return out of the function
    if(tags.includes(tag)) return; // if tag is already in the array, return out of the function
    const newTags = [...tags, tag];
    setTags(newTags);
    setLocalStorage(newTags);
    // setTag('');
  }
  // const addTag = (tag) => {
  //   const tagName = tag + tags.length;
  //   const newTags = [...tags, tagName];
  //   setTags(newTags);
  //   setLocalStorage(newTags);
  // }

  const removeTag = () => {
    if(!tag) return; // if tag is empty, return out of the function
    // if(tags.includes(tag)) {
      console.log('tagg', tag);
      const newTags = tags.filter((t) => t !== tag);
      setTags(newTags);
      setLocalStorage(newTags);
    // }
  }
  // const removeTag = (tag) => {
  //   const tagName = tag + (tags.length-1);
  //   console.log('tagName', tagName);
  //   const newTags = tags.filter((t) => t !== tagName);
  //   setTags(newTags);
  //   setLocalStorage(newTags);
  // }

  const clearTags = () => {
    setTags([]);
    setLocalStorage([]);
  }

  useEffect(() => {
    setTags(getLocalStorage());
  }, []);

  return (
    <>
      <h1>TagCreator</h1>
      <button onClick={() => addTag('tag')}>Add tag</button>
      <button onClick={() => removeTag('tag')}>Remove tag</button>
      <button onClick={() => clearTags()}>Clear tags</button>
      <input type="text" value={tag} onChange={e => setTag(e.target.value)} />
    </>
  );
}