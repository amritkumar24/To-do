import Todo from '../models/todoModel.js'; // Importing the Todo model to interact with MongoDB

// ==========================
// GET ALL TODOS (with filtering & sorting)
// ==========================
export const getTodos = async (req, res) => {
    try {
        // Extract filters & sorting options from query params (defaults set)
        const {priority='all', status='all', sort='created_desc'} = req.query;

        let filter = {}; // MongoDB filter object

        // Filter by priority if not 'all'
        if(priority !== 'all'){
            filter.priority = Number(priority);
        }

        // Filter by completion status
        if(status === 'completed'){
            filter.isCompleted = true;
        } else if (status === 'pending'){
            filter.isCompleted = false;
        }

        // Sorting options based on selected sort value
        let sortOption =  {};
        switch(sort) {
            case 'created_asc':
                sortOption.createdAt = 1; // Oldest first
                break;
            case 'created_desc':
                sortOption.createdAt = -1; // Newest first
                break;
            case 'due_asc':
                sortOption.dueDate = 1; // Nearest due date first
                break;
            case 'due_desc':
                sortOption.dueDate = -1; // Farthest due date first
                break;
            case 'priority_high_low':
                sortOption.priority = -1; // High → Low
                break;
            case 'priority_low_high':
                sortOption.priority = 1; // Low → High
                break;
        }

        // Fetch todos from DB with filter & sort applied
        const todos = await Todo.find(filter).sort(sortOption);

        // Render main page with todos and filter/sort state
        res.render('index', {todos, status, priority, sort});

    }catch (err) {
        res.status(500).send('Error fetching todos');
    }
};

// ==========================
// ADD NEW TODO
// ==========================
export const addTodo = async (req, res) => {
    try{
        const { title, dueDate, priority } = req.body;

        // Validate that title is not empty
        if(!title || title.trim() === ''){
            return res.redirect('/');
        }

        // Create new todo document
        const newToDo = new Todo ({
            title,
            dueDate: dueDate ? new Date(dueDate) : undefined, // Only set if provided
            priority: Number(priority) || 2 // Default priority is 2 (Medium)
        });

        // Save to DB
        await newToDo.save();
        res.redirect('/');
    }catch(err){
        res.status(500).send('Error adding todo');
    }
};

// ==========================
// DELETE TODO BY ID
// ==========================
export const deleteToDo = async (req, res) => {
    try{
        const {id} = req.params;

        // Delete the todo document
        await Todo.findByIdAndDelete(id);

        res.redirect('/');
    }catch(err){
        res.status(500).send('Error in deleting todo');
    }
};

// ==========================
// TOGGLE TODO COMPLETION STATUS
// ==========================
export const toggleToDo = async (req, res) => {
    try{
        const todoId = req.params.id;

        // Find todo and reverse its completion status
        const todo = await Todo.findById(todoId);
        todo.isCompleted = !todo.isCompleted;

        await todo.save();
        res.redirect('/');

    }catch (error) {
        console.error('Error toggling todo:', error);
        res.status(500).send('Internal server error');
    }
}

// ==========================
// RENDER EDIT TODO FORM
// ==========================
export const renderEditForm = async (req, res) => {
    try{
        const {id} = req.params;

        // Find todo by ID
        const todo = await Todo.findById(id);

        if(!todo){
           return res.status(404).send("Todo not found!");
        }

        // Render edit page with todo data
        res.render("edit", {todo});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

// ==========================
// UPDATE TODO BY ID
// ==========================
export const updateTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, dueDate} = req.body;

        // Find todo
        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).send('Todo not found');
        }

        // Update fields
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
