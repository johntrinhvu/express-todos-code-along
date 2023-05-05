var express = require('express');
var router = express.Router();

// Require the controller that exports To-Do CRUD functions
var todosCtrl = require('../controllers/todos');

// ALL actual paths start with "/todos"

// GET /todos
router.get('/', todosCtrl.index);

// GET /todos/:id
router.get("/:id", todosCtrl.show);

module.exports = router;
