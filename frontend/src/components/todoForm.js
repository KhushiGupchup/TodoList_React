import React, { useState } from "react";
import "./todoForm.css";
//this is use to show notification when task added
import toast from 'react-hot-toast';

const TodoForm = ({ addTask }) => {
  const [taskname, setTaskName] = useState("");//Stores the task name
  const [startDate, setStartDate] = useState("");//Stores the start date
  const [endDate, setEndDate] = useState("");//Stores the end date
  const [taskStatus, setStatus] = useState("Pending");//Stores task status (Pending, In Progress, Completed)
  const [error, setError] = useState(null);//Stores backend error messages
  const [loading, setLoading] = useState(false); // state for button

  const handleAddTask = async (e) => {
    e.preventDefault();//Prevent page reload
    //If any input is empty then show an alert:
    if (!taskname || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }
    //Created a new object to send to the backend server
    const newTask = {
      taskname,
      startDate,
      endDate,
      taskStatus,
    };
    //Show loading if it takes time
    setLoading(true); // show "Adding Task..."
    setError(null);
    //API Call to add new task
    const response = await fetch("http://localhost:4000/api/addtasktodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      // Clear form
      setTaskName("");
      setStartDate("");
      setEndDate("");
      setStatus("Pending");
      toast.success('Task Added Successfully');
      addTask(json); //  update parent
    }

    setLoading(false); // reset button to Add task
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="Form">
      <h1>Todo List</h1>
    {/* Form to add task */}
      <div className="taskform">
        <input
          placeholder="Enter your task"
          value={taskname}
          onChange={(e) => setTaskName(e.target.value)}
        />

        {/*start date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {/*end date */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {/*status dropdown */}
        <select value={taskStatus} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

      {/*Add task button which will call function to addtask */}
        <button className="Addtask" onClick={handleAddTask} disabled={loading}>
          {loading ? "Adding Task..." : "Add Task"}
        </button>
        

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default TodoForm;
