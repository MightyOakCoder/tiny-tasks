const Task = require('../../models/task');

module.exports = {
  index,
  show,
  new: newTask,
  create
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

function newTask(req, res) {
  res.render("tasks/new", { title: "Add Task" });
};

function create(req, res) {
  const task = new Task(req.body);
  for (let key in req.body) {
      if (req.body[key] === "") delete req.body[key];
  }
      task.userAdding = req.user._id;
  task.save(function(err) {
      if (err) return res.redirect("tasks/new");
      res.redirect(`/tasks/${task._id}`);
  });
}
