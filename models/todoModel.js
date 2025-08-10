import mongoose from 'mongoose'; // Import Mongoose for MongoDB interactions

// ==========================
// TODO SCHEMA DEFINITION
// ==========================
const todoSchema = new mongoose.Schema({

    // Title of the task (required field)
    title: {
        type: String,
        required: true
    },

    // Completion status of the task (default: false)
    isCompleted: {
        type: Boolean,
        default: false
    },

    // Optional due date for the task
    dueDate: {
        type: Date
    },

    // Priority of the task
    // 1 = High, 2 = Medium (default), 3 = Low
    priority: {
        type: Number,
        enum: [1, 2, 3], // Restricts values to only 1, 2, or 3
        default: 2
    }
    
}, {timestamps: true}); 
// timestamps: true → automatically adds `createdAt` and `updatedAt` fields

// ==========================
// MODEL CREATION
// ==========================
// 'Todo' will be the collection name (pluralized automatically by Mongoose)
const Todo = mongoose.model('Todo', todoSchema);

// Exporting the model so it can be used in controllers/routes
export default Todo;
