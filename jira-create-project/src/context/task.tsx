import { createContext } from "react";
import axios from "axios";
import { useState } from "react";

const TasksContext = createContext<any>();

function TaskProvider({ children } : any) {
  const [tasks, setTasks] = useState([]);

  const createTask = async (title: any, taskDesc: any) => {
    const response = await axios.post("http://localhost:5000/tasks", {
      title,
      taskDesc,
    });
    console.log(response);
    const createdTasks = [...tasks, response.data];
    setTasks(createdTasks);
  };

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    setTasks(response.data);
  };

  const deleteTaskById = async (id: any) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    const afterDeletingTask = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(afterDeletingTask);
  };

  const editTaskById = async (
    id: any,
    updatedTitle: any,
    updatedTaskDesc: any
  ) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const sharedValuesAndMethods = {
    tasks,
    createTask,
    fetchTasks,
    deleteTaskById,
    editTaskById,
  };

  return (
    <TasksContext.Provider value={sharedValuesAndMethods}>
      {children}
    </TasksContext.Provider>
  );
}
export { TaskProvider };

export default TasksContext;
