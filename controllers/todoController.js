// controllers/todoController.js
const { default: mongoose } = require("mongoose");
const Todo = require("../models/todoModel");

//Get All Tasks

exports.getAllTodos = async(req,res)=>{
  const todos = await Todo.find({}).sort({createdAt:-1})
  if(!todos)
    return res.status(400).json({error:"No Task Found"})
  res.status(200).json(todos)
}


//  Add Task in todo list
exports.addTask = async (req, res) => {
  const { taskname,startDate,endDate, taskStatus } = req.body;
  try {
    
    const todo = await Todo.create({
      taskname,
      startDate,
      endDate, 
      taskStatus 
    })
    res.status(200).json(todo)
  
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
};


//Update the task in todolist
exports.updateTask = async (req,res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such Task found"})
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // <-- returns the updated document
    );

    if(!todo){
      return res.status(400).json({error:"No such task"})
    }

    res.status(200).json(todo); // send updated task directly
  } catch(error){
    res.status(500).json({error: error.message})
  }
};

//Delete the task in todolist
exports.deleteTask = async (req,res) =>{
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such Task found "})

  }
  const todo = await Todo.findOneAndDelete({_id:id})

  if(!todo){
    return res.status(400).json({error:"No Such task to delete"})

  }
  res.status(200).json({todo})
    


}

