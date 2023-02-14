const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/api/tasks');

// router.get('/', tasksCtrl.allTasks);
router.get('/', tasksCtrl.index);
// router.get('/new', tasksCtrl.new);
router.get('/:id', tasksCtrl.show);
// router.post('/', tasksCtrl.create);
// router.get('/tasks/:id/edit', tasksCtrl.edit);
// router.put('/tasks/:id', tasksCtrl.update);

module.exports = router;