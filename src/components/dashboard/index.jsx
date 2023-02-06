import React, { useEffect, useState, useContext } from 'react';
import MainContext from '../../context/MainContext';

export default function Dashboard() {
  const { tasks, setTasks, tags, setTags } = useContext(MainContext);
  const [resume, setResume] = useState();

  const balance = (tasks) => {
    const total = tasks.reduce((acc, cur) => {
      const index = acc.findIndex((task) => task.tag === cur.tag);
      if (index === -1) {
        acc.push({tag: cur.tag, duration: cur.duration});
      } else {
        acc[index].duration += cur.duration;
      }
      return acc;
    }, []);
    return total;
  }

  /**
   * Percorre todas as tasks e todas as tags de cada task
   */

  const updateResume = () => {
    console.log('tasks', tasks);
    const allTaskByTag = [];
    // const allTags = [];
    tasks.map(task => {
      return task.tags.map(tag => {
        // allTags.push({tag, duration: task.time});
        console.log('tag', tag);
        allTaskByTag.push({tag, duration: Number(task.duration)});
      });
    });
    
    const resume = balance(allTaskByTag)
    console.log('resume', resume);
    setResume(resume);
  }

  useEffect(() => {
    updateResume();
  }, [tasks]);

  
  return (
    <>
      {resume && 
        resume.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.tag}</p>
              <p>{item.duration?.toFixed(2)}</p>
            </div>
          )  
        })
      }
    </>
  );
}