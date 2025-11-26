import React, { useState } from "react"
import "./modal.css";
import toast from 'react-hot-toast';
import axios from "axios";

const DeleteModal = ({ isOpen, onClose, taskId, onDelete }) => {
   const [loading, setLoading] = useState(false); // state for button
  if (!isOpen || !taskId) return null;

  const handleDelete = async () => {
     setLoading(true); // show "deleting Task..."
  try {
    // API call to delete the task using Axios
    const response = await axios.delete(
      `https://todolist-react-o42k.onrender.com/api/deletetasktodo/${taskId}`
    );

    // here the task delete by its id
 if (response.ok) {
        onDelete(taskId); // remove from list
        toast.success('Task deleted Successfully');
        
         setLoading(false); // reset button to delete task
  setTimeout(() => {
    setLoading(false);
  }, 2000);

    onClose(); // close modal

  } catch (error) {
    console.error("Error deleting:", error);
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete this task?</p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="delete-button" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting Task..." : "Delete"}</button>
         
         
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;








