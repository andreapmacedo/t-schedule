import React, { useEffect, useState, useContext } from 'react';
import MainContext from '../../context/MainContext';

export default function Dashboard() {
  const { tasks } = useContext(MainContext);
  const [resume, setResume] = useState();

  let sumTimes = (time1, time2) => {
    let [h1, m1] = time1.split(':')
    let [h2, m2] = time2.split(':')
    let m = 0
    let h = 0
    if ((Number(m1) + Number(m2)) >= 60) {
      // console.log('m1', m1);
      // console.log('m2', m2);
      m = (Number(m1) + Number(m2)) - 60
      h = (Number(h1) + Number(h2)) + 1
    } else if ((Number(m1) + Number(m2)) === 60) {
      // console.log('m1', m1);
      // console.log('m2', m2);
      m = 0
      h = (Number(h1) + Number(h2)) + 1
    }else {
      // console.log('m1', m1);
      // console.log('m2', m2);
      m = Number(m1) + Number(m2)
      h = Number(h1) + Number(h2)
    }

    const time = `${(h)}:${(m)}`
    return time
  }


  const balance = (tasks) => {
    const total = tasks.reduce((acc, cur) => {
      const index = acc.findIndex((task) => task.tag === cur.tag);
      if (index === -1) {
        acc.push({tag: cur.tag, duration: cur.duration});
      } else {
        // acc[index].duration += cur.duration;
        acc[index].duration = sumTimes(acc[index].duration, cur.duration);
      }
      return acc;
    }, []);
    return total;
  }

  /**
   * Implementação para soma genérica de valores mas inadequada para somar tempo
   */

  // const balance = (tasks) => {
  //   const total = tasks.reduce((acc, cur) => {
  //     const index = acc.findIndex((task) => task.tag === cur.tag);
  //     if (index === -1) {
  //       acc.push({tag: cur.tag, duration: cur.duration});
  //     } else {
  //       acc[index].duration += cur.duration;
  //     }
  //     return acc;
  //   }, []);
  //   return total;
  // }

  /**
   * Percorre todas as tasks e todas as tags de cada task
   */

  const updateResume = () => {
    const allTaskByTag = [];
    // const allTags = [];
    tasks.map(task => {
      return task.tags.map(tag => {
        // allTags.push({tag, duration: task.time});
        // allTaskByTag.push({tag, duration: Number(task.duration)});
        allTaskByTag.push({tag, duration: task.duration});
      });
    });
    
    // console.log('allTaskByTag', allTaskByTag);
    const resume = balance(allTaskByTag)
    // console.log('resume', resume);
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
              {/* <p>{item.duration?.toFixed(2)}</p> */}
              <p>{item.duration}</p>
            </div>
          )  
        })
      }
    </>
  );
}