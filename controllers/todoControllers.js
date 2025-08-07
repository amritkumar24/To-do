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

export const toggleToDo = async (req, res) => {
    try{
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);
        todo.isCompleted = !todo.isCompleted;
        await todo.save();

        res.redirect('/');

    }catch (error) {
        console.error('Error toggling todo:', error);
        res.status(500).send('Internal server error');
    }
}

export const renderEditForm = async (req, res) => {
    try{
        const {id} = req.params;
        const todo = await Todo.findById(id);

        if(!todo){
           return res.status(404).send("Todo not found!");
        }

        res.render("edit", {todo});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

export const updateTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const {title} = req.body;

        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).send('Todo not found');
        }

        todo.title = title;
        await todo.save();

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}