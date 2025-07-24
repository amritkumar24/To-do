import express from 'express';
import {getTodos, addTodo, deleteToDo} from '../controllers/todoControllers.js';

const router = express.Router();

router.get('/', getTodos );

router.post('/add', addTodo );

router.get('/delete/:id', deleteToDo );


export default router;