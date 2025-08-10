import Todo from '../models/todoModel.js';

export const getTodos = async (req, res) => {
    try {
        const {priority='all', status='all', sort='created_desc'} = req.query;
        let filter = {};
        if(priority !== 'all'){
            filter.priority = Number(priority);
        }

        if(status === 'completed'){
            filter.isCompleted = true;
        } else if (status === 'pending'){
            filter.isCompleted = false;
        }

        let sortOption =  {};
        switch(sort) {
            case 'created_asc':
                sortOption.createdAt = 1;
                break;
            case 'created_desc':
                sortOption.createdAt = -1; 
                break;
            case 'due_asc':
                sortOption.dueDate = 1; 
                break;
            case 'due_desc':
                sortOption.dueDate = -1; 
                break;
            case 'priority_high_low':
                sortOption.priority = -1; 
                break;
            case 'priority_low_high':
                sortOption.priority = 1; 
                break;
        }

        const todos = await Todo.find(filter).sort(sortOption);
        res.render('index', {todos, status, priority, sort});

    }catch (err) {
        res.status(500).send('Error fetching todos');
    }
};

export const addTodo = async (req, res) => {
    try{
        const { title, dueDate, priority } = req.body;
        if(!title || title.trim() === ''){
            return res.redirect('/');
        }

        const newToDo = new Todo ({
            title,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            priority: Number(priority) || 2
        });

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
        const {title, dueDate} = req.body;

        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).send('Todo not found');
        }

        todo.title = title;

        if(dueDate){
            todo.dueDate = new Date(dueDate);
        }

        await todo.save();
        res.redirect('/');
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}