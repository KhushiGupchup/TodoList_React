// App.js
import React, { useState } from "react";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import InfoModal from "./components/TaskInfoModal"; 
//this is use to show notification when task added
import toast, { Toaster } from 'react-hot-toast';
import "./App.css";


function App() {
  const [newTask, setNewTask] = useState(null);//it stores a newly added or updated task from form

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);//it will shows/hides the edit modal when user click on edit icon
  const [showDeleteModal, setShowDeleteModal] = useState(false);//it will shows/hides the delete modal when delete icon click
  const [showInfoModal, setShowInfoModal] = useState(false);//shows/hides the task-info popup

  const [taskToEdit, setTaskToEdit] = useState(null);//the task selected for editing when click on edit icon
  const [deleteId, setDeleteId] = useState(null);//id of the task selected for deletion
  const [taskToView, setTaskToView] = useState(null);//task selected to display in info modal

  // Called when a new task is added and Updates newTask
  const handleNewTask = (task) => {
    setNewTask(task);
  };

  //Opens the edit modal and also Saves the selected task into taskToEdit


  const openEditModal = (task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  //Sends updated task to TodoList by updating newTask
  const handleUpdatedTask = (updatedTask) => {
    setNewTask(updatedTask);
  };

  //Stores the ID of the task to be deleted
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  //Sends the deleted task ID to TodoList so it can remove that task after user confirms it for deleting
  const handleDeletedTask = (deletedId) => {
    setNewTask({ deletedId });
  };

  //Stores the task to show its details when click on info icon if task has long length
  const openInfoModal = (task) => {
    setTaskToView(task);
    setShowInfoModal(true);
  };

  return (
    <div className="App">
      <div className="todoApp">
        <div className="left">
          {/* Shows all tasks in left */}
          <TodoList
            newTask={newTask}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
           onInfo={openInfoModal}  
          />
        </div>
        {/* user enter the details in form and Adds new tasks  */}

        <div className="right">
          <TodoForm addTask={handleNewTask} />
        </div>
      </div>

      {/*edit existing task */}
 
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={taskToEdit}
        onSave={handleUpdatedTask}
      />

      {/*delete task with confirmation from user */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        taskId={deleteId}
        onDelete={handleDeletedTask}
      />
      {/*show full task info*/}
      <InfoModal
        isOpen={showInfoModal}
        todo={taskToView}
        onClose={() => setShowInfoModal(false)}
      />
      {/*Here for notification when task added successfully the toast library from react is used */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: 'green',
                color: 'white'
              },
            },
            error: {
              style: {
                background: 'red',
                color: 'white'
              },
            },
          }}
        />
        </div>
  );
    
 
}

export default App;
