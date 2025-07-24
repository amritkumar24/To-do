import Todo from '../models/todoModel.js';

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.render('index', {todos});
    }catch (err) {
        res.status(500).send('Error fetching todos');
    }
};

export const addTodo = async (req, res) => {
    try{
        const { title } = req.body;
        if(!title || title.trim() === ' '){
            return res.redirect('/');
        }

        const newToDo = new Todo ({title});
        await newToDo.save();
        res.redirect('/');
    }catch(err){
        res.status(500).send('Error adding todo');
    }
};

export const deleteToDo = async (req, res) => {
    try{
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);
        res.redirect('/');
    }catch(err){
        res.status(500).send('Error in deleting todo');
    }
};