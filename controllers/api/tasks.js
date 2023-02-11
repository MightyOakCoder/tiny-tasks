const Task = require('../../models/task');

module.exports = {
  index,
  show,
  allTasks,
//   new: newTasks,
//   create,
//   deleteTask,
//   edit,
//   update
};

async function index(req, res) {
  const tasks = await Task.find({}).sort('age').populate('ageRange').exec();
  // re-sort based upon the sortOrder of the categories
  tasks.sort((a, b) => a.ageRange.sortOrder - b.ageRange.sortOrder);
  res.json(tasks);
}

// async function show(req, res) {
//   const task = await Task.findById(req.params.id);
//   res.json(task);
// }

function show(req, res) {
    Tasks.findById(req.params.id, function(err, task) {
      res.render('tasks/show', { title: 'Task Detail', task });
    });
  }

function allTasks(req, res) {
    let taskQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    Task.find(taskQuery, function(err, tasks) {
      // Why not reuse the books/index template?
      res.render('tasks/index', {
        tasks,
        user: req.user,  // should use middleware instead (see below)
        nameSearch: req.query.name  // use to set content of search form
      });
    });
  }