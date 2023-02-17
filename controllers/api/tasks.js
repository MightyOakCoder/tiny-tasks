const Task = require('../../models/task');

module.exports = {
  index,
  show,
  new: newTask,
  create,
 };

async function index(req, res) {
  const tasks = await Task.find({}).sort('chore').populate('category').exec();
  // re-sort based upon the sortOrder of the categories
  console.log(tasks)
  tasks.sort((a, b) => (a.category && a.category.sortOrder || 0) - (b.category && b.category.sortOrder || 0));
  // tasks.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(tasks);
}

async function show(req, res) {
  const task = await Task.findById(req.params.id);
  res.json(task);
}

function newTask(req, res) {
  res.render("tasks/new", { title: "Add Tasks" });
};

function create(req, res) {
  const task = new Task(req.body);
  console.log(task)
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  task.userAdding = req.user._id;
  task.save(function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send(err);}
    res.status(200).send(task);
  });
}

