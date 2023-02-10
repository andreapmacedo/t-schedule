import React, { useState, useContext, useEffect } from 'react';
import Modal from "react-modal";
import MainContext from '../../context/MainContext';
import TagComponent from '../TagComponent/TagComponent';
import AddTagComponent from '../AddTagComponent/AddTagComponent';
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
    setTask(newTask);
    setTasksOnLocalStorage(newTask);
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

  const addTaskTag = (tagName) => {
    const newTags = [...props.task.tags, tagName];
    // console.log("newTags", newTags);
    const newTask = { ...props.task, tags: newTags}
    // console.log("newTask", newTask);
    setTask(newTask);
    setTaskTags(newTags);
    // o useEffect vai atualizar a task toda vez que o estado das tags da task for alterado
  }

  /**
   * Esta função adiciona uma tag global, ou seja, adiciona uma tag que poderá ser usada em todas as tasks
   *  
   */
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
    const newTags = props.task.tags.filter((t) => t !== tagItem);
    setTaskTags(newTags);
  }

  const setButtonStatus = () => {
    if(tag) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  // vai modificar o estado da task toda vez que o estado das tags da task for alterado
  useEffect(() => {
    updateTask();
  }, [taskTags]);

  useEffect(() => {
    updateTasks();
  }, [task]);
  
  useEffect(() => {
    setButtonStatus();
  }, [tag]);


  // const showInfo = () => {
  //   console.log("props.task", props.task);
  // }

  return (
    // <StyledTaskComponent onClick={() => showInfo() }>
    <StyledTaskComponent >
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
      
      {/* modo simples e antigo de adicionar diretamente uma tag */}
      {/* <input type="text" value={tag} onChange={e => setTag(e.target.value)} /> */}
      {/* <button onClick={() => addTaskTag()}>Adicionar Tag</button> */}
      
      {/* modal externo de adiçao de tag */}
      <button onClick={() => openModal()}>Adicionar Tag</button>
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
              { !props.task.tags.includes(tag) && <AddTagComponent tag={tag} add={addTaskTag} /> }
            </div>
          ))}
        </div>


        
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
          <button onClick={() => addGlobalTag()} disabled={buttonDisabled}>Adicionar Tag</button>
          <button onClick={() => closeModalAddTag()}>X</button>
        </Modal>

        <h2>Adicionar Tag</h2>
        <button onClick={() => closeModal()}>x</button>
      </Modal>

      <div className="tag-container">
        {
        // taskTags &&  // dessa forma não atualiza a lista de tags quando a task é atualizada
        // taskTags.map((tag, index) => (
        props.task.tags &&  
        props.task.tags.map((tag, index) => (
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