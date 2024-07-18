const express = require('express');
const app = express();

const PORT = 8080;
app.use (express.json());
 
let todos = [];
let cnt = 1 ;

app.get('/todos',(req,res)=>{
    res.json(todos);
})

app.post('/todos',(req,res)=>{
    const { todo, description } = req.body;

    if (!todo || !description ) {
        return res.status(400).send('Fill all the details...')
    }

    const entry = {id :cnt++ , todo , description}
    todos.push(entry);
    res.status(200).json(entry);
})

app.get('/todos/:id',(req,res)=>{
    const todo = todos.find(t => t.id === parseInt(req.params.id))
    if (!todo) {
        return res.status(404).send('This id is not present in Todos list')
    }

    res.status(200).json(todo);
})

app.put('/todos/:id',(req,res)=>{
    const todoTask = todos.find(t =>t.id === parseInt(req.params.id))
    if (!todoTask) {
        return res.status(404).send('This id is not present in Todos list')
    }

    const{ todo, description} = req.body;
    if (!todo || !description) {
        return res.status(400).send('Fill all the details.....')
    }

    todoTask.todo = todo;
    todoTask.description = description;
    res.json(todoTask);


})

app.delete('/todos/:id',(req,res)=>{
    const id = todos.findIndex(t =>t.id === parseInt(req.params.id))
    if (id === -1) {
        return res.status(404).send('Enter valid Id')
    }
    
    todos.splice(id,1)
    res.status(204).send('Deleted....')
})

app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
})