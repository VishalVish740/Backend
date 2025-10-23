// Initial Express setup — middleware, routes, etc.
const express = require('express');
const app = express();
const cors = require('cors');
const todoRoutes = require('./routes/todo');
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
