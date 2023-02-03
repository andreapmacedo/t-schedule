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

  // const updateResume = () => {
  //   const resumes = [];
  //   const newResume = {
  //     tag: '',
  //     total: 0,
  //     occurrences: 0,
  //   };
    
  //   tasks.map(task => {
  //     return task.tags.map(tag => {
  //       return {newResume.tag = tag
  //       newResume.total += task.time;
  //       newResume.occurrences += 1;
  //       resumes.push(newResume);
  //     });
  //   });
  //   // tasks.map (task => {
  //   //   task.tags.map(tag => {newResume.tag = tag
  //   //     newResume.total += task.time;
  //   //     newResume.occurrences += 1;
  //   //     resumes.push(newResume);
  //   //   });
  //   // });
  //   console.log('resumes', resumes);
  //   setResume(resumes);
  // }


  // useEffect(() => {
  //   updateResume();
  // }, [tasks]);

  
  return (
    <>
      <h1>resume</h1>
    </>
  );
}