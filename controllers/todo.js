const Todo = require('../models/todo');

exports.createTodos = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ error: 'Name is required.' });
        }

        const todos = await Todo.create(req.body);
        res.status(201).json({
            message: "Data Inserted Successfully",
            todos
        });
    } catch (error) {
        res.status(400).json({
            error: error.message || 'Failed to add'
        });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            message: 'Todos Fetched',
            todos
        })
    } catch (error) {
        res.status(500).json({
            error: error.message || 'Failed to fetch todo.'
        });
    }
};

exports.updateTodos = async (req, res) => {
    try {
        const todoId = req.params.id;

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found.' });
        }

        res.status(200).json({
            message: 'Todo Updated Successfully',
            updatedTodo
        });

    } catch (error) {
        res.status(400).json({
            error: error.message || 'Failed to update todo.'
        });
    }
};

exports.deleteTodos = async (req, res) => {
    try {
        const todoId = req.params.id;
        const deleteTodo = await Todo.findByIdAndDelete(todoId);
        if (!deleteTodo) {
            return res.status(400).json({ error: 'Todo not found' });
        } else {
            res.status(200).json({
                message: 'Todo Deleted Successfully',
                deleteTodo
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message || 'Failed to delete todo'
        })
    }
};
