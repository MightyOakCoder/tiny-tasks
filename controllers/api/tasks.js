const Task = require('../../models/task');

module.exports = {
  index,
  show,
};

async function index(req, res) {
  const tasks = await Task.find({}).sort('task').populate('ageRange').exec();
  // re-sort based upon the sortOrder of the categories
  tasks.sort((a, b) => a.ageRange.sortOrder - b.ageRange.sortOrder);
  res.json(tasks);
}

async function show(req, res) {
  const task = await Task.findById(req.params.id);
  res.json(task);
}