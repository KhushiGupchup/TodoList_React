// models/todoModel.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
   taskname:{
    type: String,
    required: true
  },
  startDate:{
    type: Date,
    default:Date.now
  },
  endDate:{
    type:Date,
    required:true
  },
  taskStatus:{
    type:String,
    default:"pending"

  }


},
{
  timestamps:true
});

module.exports = mongoose.model("Todo", TodoSchema);

