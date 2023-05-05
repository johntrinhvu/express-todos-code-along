// controllers/todos.js
var Todo = require('../models/todo');

module.exports = {
    index,
    show,
    new: newTodo,
    create,
    delete: deleteTodo,
    edit,
    update

};


function index(req, res) {
    res.render('todos/index', {
      todos: Todo.getAll(),
      title: 'All To-Dos'

    });
}

function show(req, res) {
    res.render('todos/show', {
        todo: Todo.getOne(req.params.id),
        title: 'To-Do Details'
        
    });
}

function newTodo(req, res) {
    res.render('todos/new', { title: 'New Todo' });

}

function create(req, res) {
    // The model is responsible for creating data
    Todo.create(req.body);

    // Do a redirect anytime data is changed
    res.redirect('/todos');

}

function deleteTodo(req, res) {
    Todo.deleteOne(req.params.id);
    res.redirect('/todos');

}

function edit(req, res) {
    const todo = Todo.getOne(req.params.id);
    res.render('todos/edit', {
        title: 'Edit To-Do',
        todo

    });

}

function update(req, res) {
    req.body.done = !!req.body.done;

    Todo.update(req.params.id, req.body);
    res.redirect(`/todos/${req.params.id}`);

}