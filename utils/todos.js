const Todos = require('../models/todos');

exports.getTodos = async (req, res) => {
  try{
    const todos = await Todos.find();
    res.json(todos);
  } catch(err) {
    res.send(err);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const newTodo = await Todos.create(req.body);
    res.status(201).json(newTodo);
  } catch(err) {
    res.send(err);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todos.remove({_id: req.params.todoId})
    res.json({message: 'Todo Deleted!'});
  } catch(err) {
    res.send(err);
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.todoId);
    res.json(todo);
  } catch(err) {
    res.send(err);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todos.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    res.json(todo);
  } catch(err) {
    res.send(err);
  }
};

module.exports = exports;
