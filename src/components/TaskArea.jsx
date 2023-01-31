import React, { useEffect, useState, useContext } from 'react';
import TaskComponent from "./TaskComponent";
import { schedule } from '../data/schedule';
import MainContext from '../context/MainContext';

export default function TaskArea() {
  const [task, setTask] = useState(schedule);
  // const [tasks, setTasks] = useState([]);
  const { tasks, setTasks } = useContext(MainContext);

  const getLocalStorage = () => {
    console.log("getLocalStorage->tasks");
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
    console.log("nextTask", nextTask);
    console.log("Criando Tarefa");
    const newTask = [...tasks, nextTask];
    setTasks(newTask);
    setLocalStorage(newTask);
    setTask(schedule);
  };
  // const createTask = () => {
  //   const nextTask = tasks.length + 1;
  //   console.log("nextTask", nextTask);
  //   console.log("Criando Tarefa");
  //   const newTask = [...tasks, nextTask];
  //   setTasks(newTask);
  //   // setLocalStorage(newTask);
  // };

  const removeTask = () => {
    console.log("Removendo Tarefa");
    // const newTask = tasks.filter((t) => t !== task);
  };

  const timeUpdate = () => {
    const durarion = task.timeEnd - task.timeStart;
    setTask({ ...task, duration: durarion });
  };

  useEffect(() => {
    setTasks(getLocalStorage());
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
      <h1>TaskArea</h1>
      <p>Title</p>
      <input name="title" type="text" onChange={handleTaskChange} value={task.title}/>
      <p>Time start</p>
      <input name="timeStart" type="text" onChange={handleTaskChange} value={task.timeStart}/>
      <p>Time end</p>
      <input name="timeEnd" type="text" onChange={handleTaskChange} value={task.timeEnd}/>
      <p>duration: {task.duration}</p>
      <button onClick={() => createTask()}>Criar Tarefa</button>
      <div>
        {tasks.map((task, index) => (
          <div key={index}>
            <TaskComponent task={task}/>
          </div>
        ))}
      </div>
    </>
  );
}