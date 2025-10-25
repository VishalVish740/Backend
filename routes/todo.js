// api routes handler for todo items

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, todoController.getTodos);
router.post('/', protect, todoController.createTodos);
router.put('/:id', protect, todoController.updateTodos);
router.delete('/:id', protect, todoController.deleteTodos);

module.exports = router;
