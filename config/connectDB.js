const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbUri = process.env.NODE_ENV === 'production'
            ? process.env.MONGO_URI
            : process.env.MONGO_URI_LOCAL;

        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB connected (${process.env.NODE_ENV})`);
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
