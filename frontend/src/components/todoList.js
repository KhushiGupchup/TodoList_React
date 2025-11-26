import React, { useEffect, useState } from "react";
import "./todoList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

/* Takes a date and converts it into:day-month-year */
const formatDate = (d) => {
  if (!d) return "N/A";
  const date = new Date(d);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/* To short long task names */
const truncateText = (text, maxWords = 40) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length <= maxWords
    ? text
    : words.slice(0, maxWords).join(" ") + "...";//If a task name is too long, it shortens it to 40 words and adds "...".
};

//newTask: tells list to update when a task is added/edited/deleted
//onEdit:opens edit modal,onDelete:opens delete modal,onInfo:opens info modal
const TodoList = ({ newTask, onEdit, onDelete, onInfo }) => {
  //Stores all tasks fetched from backend
  const [todos, setTodos] = useState([]);
  //here search task will be taken
  const [searchtask, setSearchTask] = useState("");


  /* Fetches all tasks from  backend
    Saves them into todos */
  useEffect(() => {
   const fetchTodos = async () => {
  try {
    const response = await axios.get("https://todolist-react-o42k.onrender.com/api/getalltodos");
    setTodos(response.data);
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
};

    
    fetchTodos();
  }, []);

  /* Update list on add, edit or delete */
  useEffect(() => {
    if (!newTask) return;

    // Delete
    if (newTask.deletedId) {
      setTodos((prev) => prev.filter((t) => t._id !== newTask.deletedId));
      return;
    }

    // Add or Update the task
    if (newTask._id) {
      setTodos((prev) => {
        const exists = prev.some((t) => t._id === newTask._id);
        return exists
          ? prev.map((t) => (t._id === newTask._id ? newTask : t))
          : [newTask, ...prev];
      });
    }
  }, [newTask]);

  return (
    <div className="todo-container">
      <div className="todo-details">
        <h2>My Tasks</h2>
        {/*Search bar to filter task */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchtask}
            onChange={(e) => setSearchTask(e.target.value)}
          />
        </div>

        {/*If no tasks then display this */}
        {todos.length === 0 && <p>No tasks found.</p>}

          {/* Filter tasks based on search text, then display each task */}
        {todos
          .filter((todo) => {
            const name = todo.taskname || todo.taskName || "";
            return name.toLowerCase().includes(searchtask.toLowerCase());
          })
          .map((todo) => {
            const name = todo.taskname || todo.taskName;
            const status = todo.taskStatus || todo.status;

            return (
              <div className="todo" key={todo._id}>
                {/* Left side  and task name is shorten*/}
                <div className="todo-left">
                  <div>
                    <h4>{truncateText(name)}</h4>
                  </div>

                    {/* Status of task */}
                  <div className="todo-info">
                    <div className="status-info">
                      <p
                        className={`status ${status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <strong>{status}</strong>
                      </p>
                    </div>


                  </div>
                </div>

                {/* Right buttons and dates */}
                <div className="card-right">
                  {/*dates with proper formatted way*/}
                  <div className="dates">
                    <p><strong>Start:</strong> {formatDate(todo.startDate)}</p>
                    <p><strong>End:</strong> {formatDate(todo.endDate)}</p>
                  </div>
                  {/*icons of edit,delete,info */}
                  <div className="icons-button">
                    <button className="card-btn edit-btn" onClick={() => onEdit(todo)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button className="card-btn delete-btn" onClick={() => onDelete(todo._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <button className="info-btn card-btn" onClick={() => onInfo(todo)}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </button>

                  </div>

                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TodoList;



