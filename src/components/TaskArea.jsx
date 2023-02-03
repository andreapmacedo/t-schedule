import React, { useEffect, useState, useContext } from 'react';
import TaskComponent from "./TaskComponent";
import { schedule } from '../data';
import MainContext from '../context/MainContext';
import Dashboard from './dashboard';
import Modal from "react-modal";
import { 
  // setTasksOnLocalStorage,
  // getTasksOnLocalStorage,
  // setTagsOnLocalStorage,
  getTagsOnLocalStorage
} from '../data/localStorage';

export default function TaskArea() {
  const [task, setTask] = useState(schedule);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalModeUpdate, setModalModeUpdate] = useState(false);
  const { tasks, setTasks, tags, setTags } = useContext(MainContext);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    setModalModeUpdate(false)
    setTask(schedule);
  }


  const getLocalStorage = () => {
    // console.log("getLocalStorage->tasks");
    const localStorage = window.localStorage;
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return JSON.parse(tasks);
    } else {
      return [];
    }
  };

  const setLocalStorage = (tasks) => {
    const localStorage = window.localStorage;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };


  const createTask = () => {
    const nextTask = { ...task, id: tasks.length + 1}
    // console.log("nextTask", nextTask);
    // console.log("Criando Tarefa");
    const newTask = [...tasks, nextTask];
    setTasks(newTask);
    setLocalStorage(newTask);
    setTask(schedule);
    closeModal();
  };

  /**
   * esta implementaçao abaixo está correta, porém, a task que vem como parametro é advinda de uma props que não é atualizada
   * fazendo com que após uma atualização, o valor da task não seja atualizado, e sim, o valor da task que foi passada como parametro
   */
  
  // const removeTask = () => {
  //   console.log("Removendo Tarefa");
  //   // const newTask = tasks.filter((t) => t !== task);
  // };

  /**
   * a implementação com esta estratégia foi a opção para resolver o problema gerado por estar recebendo o parametro desatulaizado
   * ja que o mesmo é advindo de uma props que não é atualizada
   */
  
  const removeTask = ({target}) => {
    const { value } = target;  
    
    const newTasks = tasks.filter((t, index) => (index+1) !== Number(value));
    
    setTasks(newTasks);
    setLocalStorage(newTasks);
  }

  /**
   * esta implementaçao abaixo está correta, porém, a task que vem como parametro é advinda de uma props que não é atualizada
   * fazendo com que após uma atualização, o valor da task não seja atualizado, e sim, o valor da task que foi passada como parametro
   */
  // const updateTask = (task) => {
  //   const { title, timeStart, timeEnd } = task;
  //   setTask({ ...task, title, timeStart, timeEnd });
  //   setModalModeUpdate(true);
  //   openModal();  
  // }

  /**
   * esta implementaçao está funcionando corretamente pois os dados que estão no contexto são os que já foram atualizados
   * utilizamos a task apenas para identificar qual task será atualizada
   */

  const updateTask = (task) => {
    const taskFound = tasks.filter((t) => t.id === task.id);
    const { title, timeStart, timeEnd } = taskFound[0];
    setTask({ ...task, title, timeStart, timeEnd });
    setModalModeUpdate(true);
    openModal();  
  }



  const setUpdateTask = () => {
    const { title, timeStart, timeEnd } = task;
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, title, timeStart, timeEnd, duration: timeEnd - timeStart };
      }
      return t;
    });
    // console.log('setUpdateTask->newTasks', newTasks);
    setTasks(newTasks);
    setLocalStorage(newTasks);
    setTask(schedule);
    setModalModeUpdate(false);
    closeModal();
  }

  const timeUpdate = () => {
    const durarion = task.timeEnd - task.timeStart;
    setTask({ ...task, duration: durarion });
  };

  useEffect(() => {
    setTasks(getLocalStorage());
    setTags(getTagsOnLocalStorage());
  }, []);

  useEffect(() => {
    timeUpdate();
  }, [task.timeStart, task.timeEnd]);

  const handleTaskChange = ({target}) => {
    const { value, name } = target;
    // if (name === 'title') {
    //   setTask({...task, title: value });
    // }
    setTask({...task, [name]: value });
  };

  return (
    <>
      <button onClick={() => openModal()}>Adicionar Tarefa</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >

        <h1>TaskArea</h1>
        <p>Title</p>
        <input name="title" type="text" onChange={handleTaskChange} value={task.title}/>
        <p>Time start</p>
        <input name="timeStart" type="text" onChange={handleTaskChange} value={task.timeStart}/>
        <p>Time end</p>
        <input name="timeEnd" type="text" onChange={handleTaskChange} value={task.timeEnd}/>
        <p>duration: {task.duration}</p>
        {modalModeUpdate ? 
          <button onClick={() => setUpdateTask()}>Atualizar Tarefa</button> :
          <button onClick={() => createTask()}>Criar Tarefa</button>
        } 
        <button onClick={() => closeModal()}>Cancelar</button>
      </Modal>

      <div>
        {tasks.map((task, index) => (
          <div key={index}>
            <TaskComponent task={task} remove={removeTask} update={updateTask}/>
          </div>
        ))}
      </div>
      <Dashboard />
    </>
  );
}