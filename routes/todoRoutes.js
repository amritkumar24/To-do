import express from 'express';
import {getTodos, addTodo, deleteToDo, toggleToDo, renderEditForm, updateTodo} from '../controllers/todoControllers.js';

const router = express.Router();

router.get('/', getTodos );

router.post('/add', addTodo );

router.get('/delete/:id', deleteToDo );

router.post('/toggle/:id', toggleToDo);

router.get('/edit/:id', renderEditForm);

router.post('/update/:id', updateTodo);


export default router;