import React, { useEffect, useState } from 'react';
import TaskComponent from "./TaskComponent";
import { schedule } from '../data/schedule';

export default function TaskArea() {
  const [stack, setStack] = useState(schedule);
  const [stacks, setStacks] = useState([1,2]);

  const createTask = () => {
    const nextStack = stacks.length + 1;
    console.log("nextStack", nextStack);
    console.log("Criando Tarefa");
    const newStack = [...stacks, nextStack];
    setStacks(newStack);
  };

  return (
    <>
      <h1>TaskArea</h1>
      <button onClick={() => createTask()}>Criar Tarefa</button>
      <div>
        {stacks.map(() => (
          <TaskComponent />
        ))}
      </div>
    </>
  );
}