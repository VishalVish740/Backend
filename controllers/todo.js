const Todo = require('../models/todo');

exports.createTodos = async (req, res) => {
    try {
        if (!req.body.name)
            return res.status(400).json({ success: 0, message: 'Name is required.' });

        const todo = await Todo.create({ ...req.body, user: req.user._id });
        res.status(201).json({ success: 1, message: 'Todo created successfully', data: todo });
    } catch (error) {
        res.status(400).json({ success: 0, message: error.message || 'Failed to add todo' });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: 1, data: todos });
    } catch (error) {
        res.status(500).json({ success: 0, message: error.message || 'Failed to fetch todos' });
    }
};

exports.updateTodos = async (req, res) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTodo)
            return res.status(404).json({ success: 0, message: 'Todo not found.' });

        res.status(200).json({ success: 1, message: 'Todo updated successfully', data: updatedTodo });
    } catch (error) {
        res.status(400).json({ success: 0, message: error.message || 'Failed to update todo' });
    }
};

exports.deleteTodos = async (req, res) => {
    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!deletedTodo)
            return res.status(404).json({ success: 0, message: 'Todo not found' });

        res.status(200).json({ success: 1, message: 'Todo deleted successfully', data: deletedTodo });
    } catch (error) {
        res.status(400).json({ success: 0, message: error.message || 'Failed to delete todo' });
    }
};
