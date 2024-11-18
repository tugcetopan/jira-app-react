import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const createTask = (title, taskDesc) => {
    const createdTasks = [
      ...tasks,
      {
        id: Math.round(Math.random() * 999999),
        title: title,
        taskDesc: taskDesc,
      },
    ];
    setTasks(createdTasks);
  };

  const deleteTaskById = (id: any) => {
    const afterDeletingTask = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(afterDeletingTask);
  };

   const editTaskById = (id, updatedTitle, updatedTaskDesc) => {
     const updatedTasks  = tasks.filter((task) => {
       return task.id !== id;
     });

     setTasks(afterDeletingTask);
   };

  return (
    <>
      <div className="App">
        <TaskCreate onCreate={createTask}></TaskCreate>
        <h1>Görevlerim</h1>
        <TaskList tasks={tasks} onDelete={deleteTaskById} onUpdate= {editTaskById}></TaskList>
      </div>
    </>
  );
}

export default App;
