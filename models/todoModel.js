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
    }
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;