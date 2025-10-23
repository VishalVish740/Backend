// api routes handler for todo items

const express = require('express');
const todoController = require('../controllers/todo');

const router = express.Router();

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodos);
router.put('/:id', todoController.updateTodos);
router.delete('/:id', todoController.deleteTodos);

module.exports = router;
