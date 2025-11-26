import React, { useState, useEffect } from "react"
import "./modal.css"
import toast from 'react-hot-toast';
import axios from "axios";

function EditModal({ isOpen, onClose, task, onSave }) {

  const [taskname, setTaskName] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false); // state for button

  // when task changes just fill the fields
  useEffect(() => {
    if (task) {
      setTaskName(task.taskname)      // name
      setStatus(task.taskStatus || task.status) // status
    }
  }, [task])

  if (!isOpen) {
    return null
  }

const handleSave = async () => {
  setLoading(true); // show "Saving Task..."
  try {
    // API call to update the task using Axios
    const res = await axios.put(
      "https://todolist-react-o42k.onrender.com/api/updatetasktodo/" + (task._id || task.id),
      {
        taskname: taskname,
        taskStatus: status
      }
    );

    // Axios automatically parses JSON, so use res.data
    const updated = res.data;

    onSave(updated);     // send updates
    setLoading(false); // reset button to Add task
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    toast.success('Task updated Successfully');
   
    onClose();           // close it

  } catch (e) {
    console.log("couldn't update task:", e);
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal-box">
        
        <h2>Edit Task</h2>

        {/* name input */}
        <textarea 
          value={taskname}
          onChange={(e)=>setTaskName(e.target.value)}
          placeholder="Task name"
        />

        {/* status dropdown */}
        <select value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
           <button onClick={handleSave} className="save-btn" disabled={loading}>
            {loading ? "Saving Task..." : "Save"}

          </button>
          
        </div>

      </div>
    </div>
  )
}

export default EditModal





