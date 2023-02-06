import React, { useEffect, useState, useContext } from 'react';
import MainContext from '../../context/MainContext';
// import { resume } from '../../data';

// const resume = {
//   tag: '',
//   total: 0,
//   occurrences: 0,
// }


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
    const allTaskByTag = [];
    // const allTags = [];
    tasks.map(task => {
      return task.tags.map(tag => {
        // allTags.push({tag, duration: task.time});
        allTaskByTag.push({tag, duration: task.duration});
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
              <p>{item.duration}</p>
            </div>
          )  
        })
      }
    </>
  );
}