// routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/todoController");

// 1) GET ALL TODOS
 router.get("/getalltodos", controller.getAllTodos);

// 2) ADD TASK
router.post("/addtasktodo", controller.addTask);

// 3) UPDATE TASK
router.put("/updatetasktodo/:id", controller.updateTask);

// 4) DELETE TASK
router.delete("/deletetasktodo/:id", controller.deleteTask);

module.exports = router;
