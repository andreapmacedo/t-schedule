import React, { useEffect, useState, useContext } from 'react';
import TaskComponent from "./TaskComponent";
import { schedule } from '../data/schedule';
import MainContext from '../context/MainContext';
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
  // const createTask = () => {
  //   const nextTask = tasks.length + 1;
  //   console.log("nextTask", nextTask);
  //   console.log("Criando Tarefa");
  //   const newTask = [...tasks, nextTask];
  //   setTasks(newTask);
  //   // setLocalStorage(newTask);
  // };

  // const removeTask = () => {
  //   console.log("Removendo Tarefa");
  //   // const newTask = tasks.filter((t) => t !== task);
  // };

  const removeTask = ({target}) => {
    const { value } = target;  
    console.log('removeTask->task', value);
    const newTasks = tasks.filter((t, index) => (index+1) !== Number(value));
    console.log('removeTask->newTasks', newTasks);
    setTasks(newTasks);
    setLocalStorage(newTasks);
  }

  const updateTask = (task) => {
    console.log('updateTask->task', task);
    const { title, timeStart, timeEnd } = task;
    console.log('updateTask->title', title);  
    console.log('updateTask->timeStart', timeStart);  
    console.log('updateTask->timeEnd', timeEnd);
    setTask({ ...task, title, timeStart, timeEnd });
    setModalModeUpdate(true);
    openModal();  
    // const newTasks = tasks.filter((t, index) => (index+1) !== Number(value));
    // console.log('removeTask->newTasks', newTasks);
    // setTasks(newTasks);
    // setLocalStorage(newTasks);
  }
  const setUpdateTask = () => {
    console.log('setUpdateTask->task', task);
    const { title, timeStart, timeEnd } = task;
    console.log('setUpdateTask->title', title);
    console.log('setUpdateTask->timeStart', timeStart);
    console.log('setUpdateTask->timeEnd', timeEnd);
    const newTasks = tasks.map((t, index) => {
      if (t.id === task.id) {
        return { ...t, title, timeStart, timeEnd, duration: timeEnd - timeStart };
      }
      return t;
    });
    console.log('setUpdateTask->newTasks', newTasks);
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
    </>
  );
}