const express = require('express');
const router = express.Router();

const Todos = require('../models/todos')
const helpers = require("../utils/todos");

router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodo)

router.route('/:todoId')
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo)

module.exports = router;
