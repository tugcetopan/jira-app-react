import React from 'react'
import TaskShow from './TaskShow'
import TasksContext from "../context/task";
import { useContext } from "react";

const TaskList = () => {
  const {tasks} = useContext(TasksContext)
  return (
    <div className="task-list">
      {tasks.map((task, index) => {
        return (
          <TaskShow
            key={index} 
            task={task}
          ></TaskShow> 
        );
      })}
    </div>
  );
};

export default TaskList
