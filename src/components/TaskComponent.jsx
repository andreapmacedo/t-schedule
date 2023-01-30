import React, { useState, useRef } from 'react';

export default function TaskComponent(props) {
  // console.log('props', props);
  const dragItem = useRef(); // drag step 2 
  const dragOverItem = useRef();  // drag step 3

  console.log('props.task', props.task);
  const [list, setList] = useState([props.task.tags]);

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
  
  return (
    <>
      {/* <h1>TaskComponent</h1> */}
      <h1>{props.task.title}</h1>
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
    </>
  );
}