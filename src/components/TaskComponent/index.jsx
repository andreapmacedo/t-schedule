import React, { useState, useContext, useEffect } from 'react';
import { setTasksOnLocalStorage } from '../../data/localStorage';
import Modal from "react-modal";
import MainContext from '../../context/MainContext';
import TagComponent from '../TagComponent';
import AddTagComponent from '../AddTagComponent';
import StyledTaskComponent from './StyledTaskComponent';
import { setTagsOnLocalStorage, getTagsOnLocalStorage } from '../../data/localStorage';

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

  return (
    <StyledTaskComponent>
      {/* <h1>TaskComponent</h1> */}
      
      <div className="task-description" >
        <div className="item-description">
          <p>Atividade:</p>
          <h1>{props.task.title}</h1>
        </div>
        <div className="item-description">
          <p>Duraçaão:</p>
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
      <button onClick={props.remove} value={task.id} >Remover</button>
      <button onClick={() => props.update(task)} >Editar</button>
    </StyledTaskComponent>
  );
}