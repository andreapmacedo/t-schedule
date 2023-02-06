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
    // tasks.sort((a, b) => a.id - b.id);
    // console.log("tasks", tasks);
    const maxId = tasks.reduce ((acc, cur) => {
      if (acc < cur.id) {
        acc = cur.id;
      }
      return acc;
    }, 0);
    const nextTask = { ...task, id: maxId + 1}
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
  
  const removeTask = ({target}) => {
    const { value } = target;  
    const newTasks = tasks.filter((t) => Number(t.id) !== Number(value));
    console.log("tasks", value);
    // const newTasks = tasks.filter((t) => t.title !== value);
    
    
    console.log("newTasks", newTasks);
    // const newTasks = tasks.filter((t) => Number(t.id) !== Number(task.id));
    // const newTasks = tasks.filter((t) => {
    //   console.log(t.id, taskId);
    //   // console.log(t.id, task.id);
    //   // Number(t.id) !== Number(task.id)
    // });

    setTasks(newTasks);
    setLocalStorage(newTasks);
    // setTaskUpdade(!taskUpdade);
  };


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

  let getDifference = (time1, time2) => {
    let [h1, m1] = time1.split(':')
    let [h2, m2] = time2.split(':')
    let time = (+h1 + (+m1 / 60)*0.6) - (+h2 + (+m2 / 60)*0.6)
    return time
  }
  
  // console.log(getDifference("10:00", "08:30"))

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
        const duration = (timeEnd - timeStart)
        // const duration = getDifference(timeEnd, timeStart)
        // return { ...t, title, timeStart, timeEnd, duration: duration };
        return { ...t, title, timeStart, timeEnd, duration: duration };
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
    // const durarion = task.timeEnd - task.timeStart;
    const duration = (task.timeEnd - task.timeStart)
    // const durarion = getDifference(task.timeEnd, task.timeStart)
    setTask({ ...task, duration: duration });
  };

  useEffect(() => {
    setTasks(getLocalStorage());
    setTags(getTagsOnLocalStorage());
  }, []);

  useEffect(() => {
    timeUpdate();
  }, [task.timeStart, task.timeEnd]);


  /**
   * a diferença desta implementação para o modelo abaixo é o tratamento especial para os inputs que são do tipo dateType
   */
  const handleTaskChange = ({target}) => {
    const { value, name } = target;
    // if (name === 'title') {
    //   setTask({...task, title: value });
    // }
    setTask({...task, [name]: value });
  };
  // /**
  //  * esta implementação permite que vários inputs sejam atualizados de forma dinamica e funciona corretamente
  //  */
  // const handleTaskChange = ({target}) => {
  //   const { value, name } = target;
  //   // if (name === 'title') {
  //   //   setTask({...task, title: value });
  //   // }
  //   setTask({...task, [name]: value });
  // };

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
        <input name="timeStart" type="time" onChange={handleTaskChange} value={task.timeStart}/>
        <p>Time end</p>
        <input name="timeEnd" type="time" onChange={handleTaskChange} value={task.timeEnd}/>
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
            {/* <TaskComponent task={task} update={updateTask}/> */}
            {/* <TaskComponent task={task} /> */}
          </div>
        ))}
      </div>
      <Dashboard />
    </>
  );
}