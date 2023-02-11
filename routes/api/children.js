const express = require('express');
const router = express.Router();
const childrenCtrl = require('../../controllers/api/children');

// GET /api/children/list
router.get('/list', childrenCtrl.list);
// POST /api/children/list/tasks/:id
router.post('/list/tasks/:id', childrenCtrl.addToList);
// POST /api/children/list/checkout
router.post('/list/checkout', childrenCtrl.checkout);
// POST /api/children/list/qty
router.put('/list/qty', childrenCtrl.setItemQtyInList);

module.exports = router;