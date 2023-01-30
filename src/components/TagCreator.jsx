import React, { useEffect, useState, useContext, useRef } from 'react';
import MainContext from '../context/MainContext';
import TagComponent from './TagComponent';

export default function TagCreator() {
  const dragItem = useRef(); // drag step 2 
  const dragOverItem = useRef();  // drag step 3
  const [tag, setTag] = useState();
  const [tags, setTags] = useState([]); 
  const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);// drag step 1 
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

  // drag step 2
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  // drag step 3
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  // drag step 4
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

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
        {
        list &&  
        list.map((tag, index) => (
          // draggable drag step 1
          // onDragStarter drag step 2
          // onDragEnter drag step 3
          <div
            key={index}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            draggable
          >  
              {tag}
          </div>
        ))}
      </div>
      {/* <div>
        {tags.map((tag, index) => (
          // draggable drag step 1
          // onDragStarter drag step 2
          // onDragEnter drag step 3
          <div
            key={index}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            draggable
          >  
              <TagComponent tag={tag} remove={removeTag}/>
          </div>
        ))}
      </div> */}
    </>
  );
}