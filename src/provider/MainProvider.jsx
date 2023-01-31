import React, { useState, useMemo } from 'react';
import MainContext from '../context/MainContext';

function MainProvider({ children }) {
  const [tags, setTags] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  const value = useMemo(() => ({
    tasks,
    setTasks,
    tags,
    setTags,
  }), [tags, tasks]);

  return (
    <MainContext.Provider value={ value }>
      {children}
    </MainContext.Provider>
  );
}

export default MainProvider;
