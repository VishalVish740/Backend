// Initial Express setup — middleware, routes, etc.
const express = require('express');
const app = express();
const cors = require('cors');
const todoRoutes = require('./routes/todo');
const errorHandler = require('./middleware/errorHandler');

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'https://todo-frontend-tau-blush.vercel.app'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
