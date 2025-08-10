import express from 'express';
import {getTodos, addTodo, deleteToDo, toggleToDo, renderEditForm, updateTodo} from '../controllers/todoControllers.js';

const router = express.Router(); // Create a new Express router instance

// Route to fetch and display all todos (with filtering/sorting)
router.get('/', getTodos);

// Route to add a new todo
router.post('/add', addTodo);

// Route to delete a todo by its ID
router.get('/delete/:id', deleteToDo);

// Route to toggle a todo's completion status
router.post('/toggle/:id', toggleToDo);

// Route to render the edit form for a specific todo
router.get('/edit/:id', renderEditForm);

// Route to update an existing todo by its ID
router.post('/update/:id', updateTodo);

export default router; // Export router to be used in main app
