import React from "react"
import "./modal.css"

const TaskInfoModal = ({isOpen, todo, onClose}) => {

    // if nothing to show, return
    if(!isOpen || !todo){
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="info-modal-box">

                <h2>Task Details</h2>

                {/* show task name */}
                <p>
                    <strong>Task :</strong> {todo.taskname || todo.taskName}
                </p>

                

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        close
                    </button>
                </div>

            </div>
        </div>
    )
}

export default TaskInfoModal
