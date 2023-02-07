import React, { useState, useContext, useEffect } from 'react';
import Modal from "react-modal";
import MainContext from '../../context/MainContext';
import TagComponent from '../TagComponent';
import AddTagComponent from '../AddTagComponent';
import StyledTaskComponent from './StyledTaskComponent';
import { setTagsOnLocalStorage,
  setTasksOnLocalStorage,
  getTasksOnLocalStorage } from '../../data/localStorage';

Modal.setAppElement('#root');

export default function TaskComponent(props) {
  const [taskTags, setTaskTags] = useState(props.task.tags);
  const [tag, setTag] = useState(''); // controled input
  const [task, setTask] = useState(props.task);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalAddTagIsOpen, setModalAddTagIsOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { tasks, setTasks, tags, setTags } = useContext(MainContext);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const openModalAddTag = () => {
    setModalAddTagIsOpen(true);
  }

  const closeModalAddTag = () => {
    setModalAddTagIsOpen(false);
  }

  const updateTask = () => {
    const newTask = { ...task, tags: taskTags}
    // const newTask = { ...task, tags: taskTags}
    // console.log('updateTask->newTask', newTask);
    setTask(newTask);
    setTasksOnLocalStorage(newTask);
  }

  const updateTasks = () => {
    // console.log('updateTasks->props.task', task);
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


  // adicionar tag a task
  const addTaskTag = (tagName) => {
    // console.log('addTaskTag->tagItem', tagName);
    if(!tagName) return; // if tag is empty, return out of the function
    if(taskTags.includes(tagName)) return; // if tag is already in the array, return out of the function
    const newTags = [...taskTags, tagName];
    setTaskTags(newTags);
    setTag('');
  }

  const addGlobalTag = () => {
    if(!tag) return; // if tag is empty, return out of the function
    // if(tags.includes(tag)) return; // if tag is already in the array, return out of the function
    if(tags.includes(tag)) {
      alert('tag já existe e já foi adicionada à tarefa!');
      setTag('');
      return;
    }; // if tag is already in the array, return out of the function
    const newTags = [...tags, tag];
    setTags(newTags);
    setTag('');
    setTagsOnLocalStorage(newTags);
    closeModalAddTag();
  }

  const removeTag = (tagItem) => {
    const newTags = taskTags.filter((t) => t !== tagItem);
    setTaskTags(newTags);
  }

  const setButtonStatus = () => {
    if(tag) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  useEffect(() => {
    updateTask();
  }, [taskTags]);

  useEffect(() => {
    updateTasks();
  }, [task]);
  
  useEffect(() => {
    setButtonStatus();
  }, [tag]);


  // const update = (task) => {
  //   const taskFound = tasks.filter((t) => t.id === task.id);
  //   const { title, timeStart, timeEnd } = taskFound[0];
  //   setTask({ ...task, title, timeStart, timeEnd });
  //   // setModalModeUpdate(true);
  //   // openModal();  
  // }

  // const remove = (task) => {
  //   console.log("Removendo Tarefa");
    
  //   // const newTasks = tasks.filter((t) => Number(t.id) !== Number(task.id));
  //   const newTasks = tasks.filter((t) => t.title !== task.title);
  //   console.log('task.title', task.title);
  //   tasks.filter((t) => {
  //     console.log('t.title', t.title);
  //     // Number(t.id) !== Number(task.id)
  //   });

  //   setTasks(newTasks);
  //   setTasksOnLocalStorage(newTasks);
  // };

  // useEffect(() => {
  //   console.log('taskTags', taskTags);
  //   setTasks(getTasksOnLocalStorage());
  // }, [remove]);

  return (
    <StyledTaskComponent>
      {/* <h1>TaskComponent</h1> */}
      
      <div className="task-description" >
        <div className="item-description">
          <p>Atividade:</p>
          <h1>{props.task.title}</h1>
        </div>
        <div className="item-start-end">
          <span>
            <p>Início:</p>
            <h1>{props.task.timeStart}</h1>
          </span>
          <span>
            <p>Fim:</p>
            <h1>{props.task.timeEnd}</h1>
          </span>
        </div>
        <div className="item-description">
          <p>Duração:</p>
          <h1>{props.task.duration}</h1>
        </div>
      </div>
      
      <p>Tag</p>
      {/* modo simples e antigo de adicionar diretamente uma tag */}
      {/* <input type="text" value={tag} onChange={e => setTag(e.target.value)} /> */}
      {/* <button onClick={() => addTaskTag()}>Adicionar Tag</button> */}
      
      {/* modal externo de adiçao de tag */}
      <button onClick={() => openModal()}>Adicionar Tag by modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className="tag-container">
          {
          tags &&  
          tags.map((tag, index) => (
            <div
              key={index}
            >  
              { !taskTags.includes(tag) && <AddTagComponent tag={tag} add={addTaskTag} /> }
            </div>
          ))}
        </div>


        {/* modal interno de adiçao de tag */}
        <button onClick={() => openModalAddTag()}>Open internal Modal</button>
        <Modal
          isOpen={modalAddTagIsOpen}
          onRequestClose={closeModalAddTag}
          contentLabel="Example Modal"
          overlayClassName="modal-overlay"
          className="modal-content"
        >
          <h2>modal interno</h2>
          <input type="text" value={tag} onChange={e => setTag(e.target.value)} />
          {/* <button onClick={() => addTaskTag()}>Adicionar Tag</button> */}
          <button onClick={() => addGlobalTag()} disabled={buttonDisabled}>Adicionar Tag</button>
          <button onClick={() => closeModalAddTag()}>X</button>
        </Modal>

        <h2>Adicionar Tag</h2>
        <button onClick={() => closeModal()}>x</button>
      </Modal>
      <div className="tag-container">
        {
        taskTags &&  
        taskTags.map((tag, index) => (
          <div
            key={index}
          >  
            {/* {tag} */}
            <TagComponent tag={tag} remove={removeTag}/>
          </div>
        ))}
      </div>
      {/* <button onClick={() => remove(task)} >Remover</button> */}
      {/* <button onClick={() => update(task)} >Editar</button> */}
      <button onClick={props.remove} value={props.task.id} >Remover</button>
      {/* <button onClick={props.remove} value={props.task.title} >Remover</button> */}
      <button onClick={() => props.update(props.task)} >Editar</button>
    </StyledTaskComponent>
  );
}