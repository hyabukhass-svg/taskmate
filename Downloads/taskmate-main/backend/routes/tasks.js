const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

// GET all tasks
router.get("/", tasksController.getTasks);

// CREATE a new task
router.post("/", tasksController.createTask);

// UPDATE a task
router.put("/:id", tasksController.updateTask);

// DELETE a task
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
