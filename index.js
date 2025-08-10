// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import bodyParser from 'body-parser';
import path from 'path';
import todoRoutes from './routes/todoRoutes.js';

// Initialize Express app
const app = express();
const port = process.env.PORT;

// Get current file and directory paths (ES module style)
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

// Get MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating/view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use todo routes for handling application endpoints
app.use('/', todoRoutes);

// Connect to MongoDB and start the server
mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(port, () => {
            console.log(`Server is running on https://localhost:${port}`);
        });
    })
    .catch((err) => console.error(err));
