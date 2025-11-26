import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [show, setshow] = useState(false);

  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(
    // () => {
    // const savedTasks = localStorage.getItem("tasks");
    // return savedTasks ? JSON.parse(savedTasks) :
    []
    //}
  );
  const [editId, setEditId] = useState(null);
  const [isloaded, setloaded] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
      console.log(savedTasks);
    }
    setloaded(false);
  }, []);

  useEffect(() => {
    if (isloaded) return;

    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList, isloaded]);

  const handleAddOrUpdate = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    if (editId) {
      setTaskList(
        taskList.map((item) =>
          item.key === editId ? { ...item, task: trimmedTask } : item
        )
      );
      setEditId(null);
    } else {
      const newTask = {
        key: uuidv4(),
        task: trimmedTask,
        completed: false,
      };
      setTaskList([...taskList, newTask]);
    }

    setTask("");
  };

  const handleDelete = (id) => {
    setTaskList(taskList.filter((item) => item.key !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = taskList.find((item) => item.key === id);

    if (!taskToEdit) return;
    setTask(taskToEdit.task);
    setEditId(id);
  };

  const toggleComplete = (id) => {
    setTaskList(
      taskList.map((item) =>
        item.key === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  function close() {
    if (show===true){ setshow(false)}
    else setshow(true)
 
  }

  return (
    <>
      <button onClick={(e) => close(e)}>Add model</button>
      {show && (
        <div className="Modal">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddOrUpdate();
              }}
            >
              <input
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                style={{
                  width: "70%",
                  padding: "0.5rem",
                  marginRight: "0.5rem",
                }}
              />
              <button type="submit" disabled={!task.trim()}>
                {editId ? "Update" : "Add"}
              </button>
            </form>
            <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
              {taskList.map((item) => (
                <li
                  key={item.key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <span
                    onClick={() => toggleComplete(item.key)}
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                      cursor: "pointer",
                      flex: 1,
                    }}
                  >
                    {item.task}
                  </span>
                  <div>
                    <button
                      onClick={() => handleEdit(item.key)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.key)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
