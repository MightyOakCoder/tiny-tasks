const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/api/tasks');

// GET /api/tasks
router.get('/', tasksCtrl.index);
// GET /api/tasks/:id
router.get('/:id', tasksCtrl.show);

module.exports = router;