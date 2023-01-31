import React, { useState, useContext, useEffect } from 'react';
// import React, { useState, useRef } from 'react';
import { setTasksOnLocalStorage } from '../data/localStorage';
import MainContext from '../context/MainContext';

/* a problematica deste componente.
  É preciso ter acesso ao localstorage com todos as tasks para que possa ser
  adicionado uma nova tag a uma task.
  soluçoes:
  1. passar o localstorage como props para o componente (não testei)
  2. criar um contexto para as tasks, e apenas atualizar o localstorage quando uma tag for adicionada
*/


export default function TaskComponent(props) {
  // console.log('props', props);
  // const dragItem = useRef(); // drag step 2 
  // const dragOverItem = useRef();  // drag step 3

  console.log('props.task', props.task);
  const [tags, setTags] = useState(props.task.tags);
  const [tag, setTag] = useState(''); // controled input
  const [task, setTask] = useState(props.task);
  const { tasks, setTasks } = useContext(MainContext);
  // const input = React.createRef();

  // // drag step 2
  // const dragStart = (e, position) => {
  //   dragItem.current = position;
  //   console.log(e.target.innerHTML);
  // };

  // // drag step 3
  // const dragEnter = (e, position) => {
  //   dragOverItem.current = position;
  //   console.log(e.target.innerHTML);
  // };

  // // drag step 4
  // const drop = (e) => {
  //   const copyListItems = [...list];
  //   const dragItemContent = copyListItems[dragItem.current];
  //   copyListItems.splice(dragItem.current, 1);
  //   copyListItems.splice(dragOverItem.current, 0, dragItemContent);
  //   dragItem.current = null;
  //   dragOverItem.current = null;
  //   setList(copyListItems);
  // };
  
  // const handleSubmit = ({target}) => {
  //   const { value } = target;
  //   const newTags = [...tags, value];
  //   setTags(newTags);
  // }

  // const updateTask = (task) => {
  //   const newTasks = tasks.map(t => {
  //     if(t.id === task.id) {
  //       const newTask = { ...task, tags: tags}


  // const updateTask = (task) => {
    // const newTasks = tasks.map(t => {
    //   if(t.id === task.id) {

    //     const newTask = { ...task, tags: tags}
    //     // const newTask = [...tasks, nextTask];
    //     setTask(newTask);
    //     // setTasksOnLocalStorage(newTasks);
        
    //   } else {
    //     return t;
    //   }
    // });
  // }

  const updateTask = () => {
    const newTask = { ...task, tags: tags}
    setTask(newTask);
  }

  const updateTasks = () => {
    const newTasks = tasks.map(t => {
      if(t.id === task.id) {
        return task;
      } else {
        return t;
      }
    });
    setTasks(newTasks);
    setTasksOnLocalStorage(newTasks);
  }

  const addTag = () => {
    if(!tag) return; // if tag is empty, return out of the function
    if(tags.includes(tag)) return; // if tag is already in the array, return out of the function
    const newTags = [...tags, tag];
    setTags(newTags);
    setTag('');
  }

  useEffect(() => {
    updateTask();
  }, [tags]);

  useEffect(() => {
    updateTasks();
  }, [task]);

  return (
    <>
      {/* <h1>TaskComponent</h1> */}
      <h1>{props.task.title}</h1>
      <p>Tag</p>
      <input type="text" value={tag} onChange={e => setTag(e.target.value)} />
      <button onClick={() => addTag()}>Adicionar Tag</button>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            defaultValue="Bob"
            type="text"
            ref={input} />
        </label>
        <input type="submit" value="Submit" />
      </form> */}
      <div>
        {
        tags &&  
        tags.map((tag, index) => (
          <div
            key={index}
          >  
            {tag}
          </div>
        ))}
      </div>
    </>
  );
  // return (
  //   <>
  //     {/* <h1>TaskComponent</h1> */}
  //     <h1>{props.task.title}</h1>
  //     <div>
  //       {
  //       tags &&  
  //       tags.map((tag, index) => (
  //         // draggable drag step 1
  //         // onDragStarter drag step 2
  //         // onDragEnter drag step 3
  //         <div
  //           key={index}
  //           onDragStart={(e) => dragStart(e, index)}
  //           onDragEnter={(e) => dragEnter(e, index)}
  //           onDragEnd={drop}
  //           draggable
  //         >  
  //             {tag}
  //         </div>
  //       ))}
  //     </div>
  //   </>
  // );
}