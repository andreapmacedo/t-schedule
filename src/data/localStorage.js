export const getTasksOnLocalStorage = () => {
  console.log("getLocalStorage->tasks");
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