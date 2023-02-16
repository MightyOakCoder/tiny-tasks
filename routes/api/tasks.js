const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/api/tasks');

router.get("/", tasksCtrl.index);
router.get("/:id", tasksCtrl.show);
router.post("/", tasksCtrl.create);
router.get("/new", tasksCtrl.new);
module.exports = router;