import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const createTask = async (title, taskDesc) => {
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
    debugger;
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTaskById = async (id: any) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    const afterDeletingTask = tasks.filter((task) => {
      return task.id !== id;
    }); 

    setTasks(afterDeletingTask);
  };

  const editTaskById = async(id: any, updatedTitle: any, updatedTaskDesc: any) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="App">
        <TaskCreate onCreate={createTask}></TaskCreate>
        <h1>Görevlerim</h1>
        <TaskList
          tasks={tasks}
          onDelete={deleteTaskById}
          onUpdate={editTaskById}
        ></TaskList>
      </div>
    </>
  );
}

export default App;
