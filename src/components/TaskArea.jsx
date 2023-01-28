import React, { useEffect, useState } from 'react';
import TaskComponent from "./TaskComponent";
import { schedule } from '../data/schedule';

export default function TaskArea() {
  console.log("schedule", schedule);
  console.log("schedule.title", schedule.title);
  const [task, setTask] = useState(schedule);
  const [tasks, setTasks] = useState([]);

  console.log("task", task);
  console.log("task.title", task.title);

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
    // const nextTask = tasks.length + 1;
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

  useEffect(() => {
    setTasks(getLocalStorage());
  }, []);

  const handleTaskChange = ({target}) => {
    const { value, name } = target;
    if (name === 'title') {
      setTask({...task, title: value });
    }
  };

  return (
    <>
      <h1>TaskArea</h1>
      <input name="title" type="text" onChange={handleTaskChange} value={task.title}/>
      <button onClick={() => createTask()}>Criar Tarefa</button>
      <div>
        {tasks.map((index) => (
          <div key={index}>
            <TaskComponent />
          </div>
        ))}
      </div>
    </>
  );
}