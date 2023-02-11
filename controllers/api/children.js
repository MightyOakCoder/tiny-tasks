const Child = require('../../models/child');
// const Task = require('../../models/task');

module.exports = {
  list,
  addToList,
  setItemQtyInList,
  checkout,
};

// A list is the unpaid order for a user
async function list(req, res) {
  const list = await Child.getList(req.user._id);
  res.json(list);
}

// Add an item to the list
async function addToList(req, res) {
  const list = await Child.getList(req.user._id);
  // The promise resolves to the document, which we already have
  // in the list variable, so no need to create another variable...
  await list.addTaskToList(req.params.id); 
  res.json(list);
}

// Updates an item's qty in the list
async function setItemQtyInList(req, res) {
  const list = await Child.getList(req.user._id);
  await list.setTaskQty(req.body.taskId, req.body.newQty);
  res.json(list)
}

// Update the list's isPaid property to true
async function checkout(req, res) {
const list = await Child.getList(req.user._id);
list.isPaid = true;
await list.save();
res.json(list);
}