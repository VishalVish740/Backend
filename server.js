// Main entry point: load .env, connect to DB, start server.
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/connectDB');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();  // Wait for DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
