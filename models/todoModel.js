import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: Number,
        enum: [1, 2, 3],
        default: 2
    }
    
}, {timestamps: true});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;