import React, { useState, useMemo } from 'react';
import MainContext from '../context/MainContext';

function MainProvider({ children }) {
  // const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  
  const value = useMemo(() => ({
    // users,
    // setUsers,
    tags,
    setTags,
  }), [tags]);

  return (
    <MainContext.Provider value={ value }>
      {children}
    </MainContext.Provider>
  );
}

export default MainProvider;
