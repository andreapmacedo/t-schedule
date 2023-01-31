import React, { useState, useContext, useEffect } from 'react';
import { setTasksOnLocalStorage } from '../../data/localStorage';
import Modal from "react-modal";
import MainContext from '../../context/MainContext';
import TagComponent from '../TagComponent';
import StyledTaskComponent from './StyledTaskComponent';

Modal.setAppElement('#root');
// Modal.setAppElement('*');

export default function TaskComponent(props) {
  const [taskTags, setTaskTags] = useState(props.task.tags);
  const [tag, setTag] = useState(''); // controled input
  const [task, setTask] = useState(props.task);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { tasks, setTasks, tags, setTags } = useContext(MainContext);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
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

  const addTag = () => {
    if(!tag) return; // if tag is empty, return out of the function
    if(taskTags.includes(tag)) return; // if tag is already in the array, return out of the function
    const newTags = [...taskTags, tag];
    setTaskTags(newTags);
    setTag('');
  }

  const removeTag = (tagItem) => {
    const newTags = taskTags.filter((t) => t !== tagItem);
    setTaskTags(newTags);
  }

  useEffect(() => {
    updateTask();
  }, [taskTags]);

  useEffect(() => {
    updateTasks();
  }, [task]);

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
      <input type="text" value={tag} onChange={e => setTag(e.target.value)} />
      <button onClick={() => addTag()}>Adicionar Tag</button>
      <button onClick={() => openModal()}>Adicionar Tag by modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >

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
    </StyledTaskComponent>
  );
}