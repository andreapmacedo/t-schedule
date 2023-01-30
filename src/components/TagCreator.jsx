import React, { useEffect, useState, useContext } from 'react';
import MainContext from '../context/MainContext';
import TagComponent from './TagComponent';

export default function TagCreator() {
  const [tag, setTag] = useState();
  const [tags, setTags] = useState([]);
  // const { tags, setTags } = useContext(MainContext);

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
    setTag('');
  }

  const removeTag = (tagItem) => {
    const newTags = tags.filter((t) => t !== tagItem);
    setTags(newTags);
    setLocalStorage(newTags);
  }

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
      <button onClick={() => clearTags()}>Clear tags</button>
      <input type="text" value={tag} onChange={e => setTag(e.target.value)} />
      <div>
        {tags.map((tag, index) => (
          <div key={index} draggable>
            <TagComponent tag={tag} remove={removeTag}/>
          </div>
        ))}
      </div>
    </>
  );
}