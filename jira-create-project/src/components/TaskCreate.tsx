import React, { useState } from "react";

const TaskCreate = ({ onCreate, task, taskformUpdate, onUpdate }: any) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [taskDesc, setTaskDesc] = useState(task ? task.taskDesc : "");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(event.target.value);
  };

  const handleTaskChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTaskDesc(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskformUpdate) {
      onUpdate(task.id, title, taskDesc);
    } else {
      onCreate(title, taskDesc);
    }
    setTitle("");
    setTaskDesc("");
  };

  console.log(taskformUpdate);

  return (
    <div>
      {taskformUpdate ? (
        <div className="task-update">
          <h3>Lütfen Taskı Düzenleyiniz</h3>
          <form className="task-form">
            <label className="task-label">Başlığı Düzenleyiniz!</label>
            <input
              value={title}
              onChange={handleChange}
              className="task-input"
            ></input>
            <label className="task-label">Taskı Düzenleyiniz!</label>
            <textarea
              value={taskDesc}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            ></textarea>
            <button
              className="task-button task-update-button"
              onC
              onClick={handleSubmit}
            >
              Düzenle
            </button>
          </form>
        </div>
      ) : (
        <div className="task-create">
          <h3>Lütfen Task Ekleyiniz</h3>
          <form className="task-form">
            <label className="task-label">Başlık</label>
            <input
              value={title}
              onChange={handleChange}
              className="task-input"
            ></input>
            <label className="task-label">Task Giriniz</label>
            <textarea
              value={taskDesc}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            ></textarea>
            <button className="task-button" onClick={handleSubmit}>
              Oluştur
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskCreate;
