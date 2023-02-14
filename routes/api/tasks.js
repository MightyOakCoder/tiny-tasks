const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/api/tasks');

router.get('/', tasksCtrl.index);
router.get('/:id', tasksCtrl.show);

module.exports = router;