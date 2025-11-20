import React from "react";
import "./modal.css";

const DeleteModal = ({ isOpen, onClose, taskId, onDelete }) => {
  if (!isOpen || !taskId) return null;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://todolist-react-o42k.onrender.com/api/deletetasktodo/${taskId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        onDelete(taskId); // remove from list
        onClose();
      } else {
        console.error("Delete failed");
      }
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
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

