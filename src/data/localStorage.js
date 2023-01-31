export const getTasksOnLocalStorage = () => {
  // console.log("getLocalStorage->tasks");
  const localStorage = window.localStorage;
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }
};

export const setTasksOnLocalStorage = (tasks) => {
  const localStorage = window.localStorage;
  localStorage.setItem("tasks", JSON.stringify(tasks));
};



export const getTagsOnLocalStorage = () => {
  console.log('getLocalStorage->tags');
  const localStorage = window.localStorage;
  const tags = localStorage.getItem('tags');
  if (tags) {
    return JSON.parse(tags);
  } else {
    return [];
  }
}

export const setTagsOnLocalStorage = (tags) => {
  const localStorage = window.localStorage; 
  localStorage.setItem('tags', JSON.stringify(tags)); 
}