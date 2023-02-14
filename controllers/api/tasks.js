const Task = require('../../models/task');

module.exports = {
  index,
  show,
};

async function index(req, res) {
  const tasks = await Task.find({}).sort('chore').populate('category').exec();
  // re-sort based upon the sortOrder of the categories
  tasks.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(tasks);
}

async function show(req, res) {
  const task = await Task.findById(req.params.id);
  res.json(task);
}

